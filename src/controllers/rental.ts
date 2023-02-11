import pg_format from "pg-format";
import { Request, Response } from "express";
import moment from "moment";
import pool from "../database/connect";
import { Rental } from "../types/Rental";
import {
  getRental,
  getRentals,
  addRental,
  updateRentalFee,
} from "../database/queries/rental";
import { getMovie, updateMovie,updateMovieNumberInStock } from "../database/queries/movie";

import { rentalPrice } from "../utils/rentalPrice";
import { createRentalInput } from "src/validators/rental";

export const getRentalsContrller = async ({}, res: Response<Rental[]>) => {
  /**
   * DONE: return all rentals in the shop
   */
  const rentals = await pool.query(getRentals);
  return res.send(rentals.rows);
};

export const getRentalController = async (
  req: Request<{ customerId: string; movieId: string }>,
  res: Response<Rental | string>
) => {
  /**
   * DONE: validate if rental exists or not
   * DONE: return rental
   */
  const rental = await pool.query(getRental, [
    req.params.customerId,
    req.params.movieId,
  ]);
  if (!rental.rows.length)
    return res.send("not rental found check customer or movie id ");
  return res.send(rental.rows[0]);
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
  const movie = await pool.query(getMovie, [req.body.movieId]);
  if (!movie.rows.length) return res.send("no movie found with that id ");

  await pool.query(
    pg_format(
      updateMovie,
      "numberinstock",
      movie.rows[0].numberinstock - 1,
      req.body.movieId
    )
  );
  const rental = await pool.query(addRental, [
    req.body.movieId,
    req.body.customerId,
  ]);

  return res.send(rental.rows[0]);
};

export const backRentalController = async (
  req: Request<{ customerId: string; movieId: string }>,
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
  let rental = await pool.query(getRental, [
    req.params.customerId,
    req.params.movieId,
  ]);
  if (!rental.rows.length) return res.status(404).send("no rental found");
  
  await pool.query("BEGIN");
  
  await pool.query(pg_format(updateMovieNumberInStock, 1, req.params.movieId));

  const rentalFee = rentalPrice(
    rental.rows[0].dateOut,
    rental.rows[0].dailyrentalrate
  );

  rental = await pool.query(updateRentalFee, [
    rentalFee.toFixed(2),
    moment().format("YYYY-MM-DD"),
    req.params.customerId,
    req.params.movieId,
  ]);

  await pool.query("COMMIT");
  
  return res.send(rental.rows[0]);
};
