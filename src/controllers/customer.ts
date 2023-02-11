import { Request, Response } from "express";
import pg_format from "pg-format";

import pool from "../database/connect";
import {
  customerIdParamInput,
  createCustomerInput,
  updateCustomerInput,
} from "../validators/customer";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  updateCustomer,
} from "../database/queries/customer";

export const getCustomerController = async (
  req: Request<customerIdParamInput>,
  res: Response<createCustomerInput | string>
) => {
  let customer = await pool.query(
    pg_format(getCustomer, "customer_id", req.params.id)
  );

  if (!customer.rows.length)
    return res.status(404).send("no customer found with that id");

  return res.send(customer.rows[0]);
};

export const createCustomerController = async (
  req: Request<{}, {}, createCustomerInput>,
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

  let customer = await pool.query(pg_format(getCustomer, "name", name));
  if (customer.rows.length) return res.send("customer name already exist");
  customer = await pool.query(createCustomer, [name, isGold, phone]);
  return res.send(customer.rows[0]);
};

export const updateCustomerController = async (
  req: Request<{ id: string }, {}, updateCustomerInput>,
  res: Response<createCustomerInput>
) => {
  let customer = await pool.query(
    pg_format(updateCustomer, "name", req.body.name, req.params.id)
  );
  return res.send(customer.rows[0]);
};

export const deleteCustomerController = async (
  req: Request<{ id: string }>,
  res: Response<{ deleted: boolean; message: string }>
) => {
  await pool.query(deleteCustomer, [req.params.id]);
  return res.send({ deleted: true, message: "customer deleted succesfully" });
};
