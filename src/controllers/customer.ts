import { Request, Response } from "express";
import {
  createCustomerInput,
  updateCustomerInput,
} from "../validators/customer";
import { Customer } from "../database/entities/customer";

export const getCustomerController = async (
  req: Request<{ id: string }>,
  res: Response<createCustomerInput | string>
) => {
  const id: number = parseInt(req.params.id as string);
  let customer = await Customer.findOne({
    where: { customer_id: id },
  });

  if (!customer) return res.status(404).send("no customer found with that id");

  return res.send(customer);
};

export const createCustomerController = async (
  req: Request<{ id: string }, {}, createCustomerInput>,
  res: Response<createCustomerInput | string>
) => {
  /**
   * DONE: validate request body to match create customer cirteria
   * DONE: apply middleware to check if user is authenticated or not
   * DONE: check if customer must be unique
   * DONE: create a new customer
   */
  let { name, isGold, phone } = req.body;
  isGold = isGold || false;

  let customerExists = await Customer.findOne({ where: { name } });
  if (customerExists) return res.send("customer name already exist");

  let customer = await Customer.createQueryBuilder()
    .insert()
    .into(Customer)
    .values({ name, isGold, phone })
    .returning("*")
    .execute();

  return res.send(customer.raw[0]);
};

export const updateCustomerController = async (
  req: Request<{ id: string }, {}, updateCustomerInput>,
  res: Response<createCustomerInput>
) => {
  const id: number = parseInt(req.params.id as string);

  let customer = await Customer.createQueryBuilder("customers")
    .update(Customer)
    .set(req.body)
    .where("customer_id = :id ", { id })
    .returning("*")
    .execute();

  return res.send(customer.raw[0]);
};

export const deleteCustomerController = async (
  req: Request<{ id: string }>,
  res: Response<{ deleted: boolean; message: string }>
) => {
  const id: number = parseInt(req.params.id as string);
  await Customer.createQueryBuilder()
    .delete()
    .from(Customer)
    .where("customer_id=:id", { id })
    .execute();
  return res.send({ deleted: true, message: "customer deleted succesfully" });
};
