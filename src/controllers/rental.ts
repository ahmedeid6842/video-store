import moment from "moment";
import { Request, Response } from "express";
import { rentalPrice } from "../utils/rentalPrice";
import { createRentalInput } from "../validators/rental";
import { Customer, Movie, Rental } from "../database/entities";
import dataSource from "../database/connect";

export const getRentalsContrller = async (
  req: Request<
    {},
    {},
    { dateOut?: Date; dateReturned?: Date; customer?: number; movie?: number }
  >,
  res: Response
) => {
  /**
   * DONE: return all rentals in the shop
   */
  let querySrting = " ";
  let queryKeys = Object.keys(req.query);

  for (let index = 0; index < queryKeys.length; index++) {
    if (req.query[queryKeys[index]] === "customer") {
      querySrting += `customers.customer_id = ${req.query[queryKeys[index]]} `;
    } else {
      querySrting += `
      rentals.${queryKeys[index]} = ${req.query[queryKeys[index]]} `;
    }
    if (index < queryKeys.length - 1) {
      querySrting += `AND`;
    }
  }

  const rentals = await dataSource
    .getRepository(Rental)
    .createQueryBuilder("rentals")
    .leftJoinAndSelect("rentals.customer", "customers")
    .where(querySrting)
    .getMany();

  res.send(rentals);
};

export const addRentalController = async (
  req: Request<{}, createRentalInput>,
  res: Response<Rental | string>
) => {
  /**
   * DONE: validate customerId and movieId body exists
   * DONE: decrease movie number in stock
   * DONE: add new rental
   */
  const movie = await Movie.findOne({ where: { movie_id: req.body.movieId } });
  if (!movie) return res.send("no movie found with that id ");

  const customer = await Customer.findOne({
    where: { customer_id: req.body.customerId },
  });
  if (!customer) return res.send("no customer found with that id");

  let rental;
  await dataSource.transaction(async () => {
    movie.numberInStock -= 1;
    await movie.save();

    rental = await Rental.create({
      customer,
      movie,
    }).save();
  });
  return res.send(rental);
};

export const backRentalController = async (
  req: Request<{ rentalId: string }, {}, {}, { dateOut?: Date }>,
  res: Response<Rental | string>
) => {
  /**
   * DONE: validate if rental exist or not
   * DONE: calculate rental price using rentalPrice util function
   * DONE: update rental table to contain movie's date returned and rental fee
   * DONE: update movie number in stock
   * DONE: add transaction to commit both update movie and rental
   * DONE: return the rental
   */
  const rental_id: number = parseInt(req.params.rentalId as string);
  const rental = await dataSource
    .getRepository(Rental)
    .createQueryBuilder("rentals")
    .leftJoinAndSelect("rentals.movie", "movies")
    .where("rentals.rental_id = :id", { id: rental_id })
    .getOne();
  if (!rental) return res.status(404).send("no rental found");

  await dataSource.transaction(async () => {
    rental.rentalFee = rentalPrice(
      rental.dateOut,
      rental.movie.dailyRentalRate
    );
    rental.dateReturned = moment().format("YYYY-MM-DD");
    await rental.save();

    await Movie.update(
      { movie_id: rental.movie.movie_id },
      { numberInStock: rental.movie.numberInStock + 1 }
    );
  });

  return res.send(rental);
};
