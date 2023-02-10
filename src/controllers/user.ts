import { Request, Response } from "express";
import pg_format from "pg-format";
import bcrypt from "bcrypt";
import _ from "lodash";
import { loginInput, registerInput } from "../validators/user";
import pool from "../database/connect";
import { User } from "../types/User";
import { createUser, getUser } from "../database/queries/user";
import { createToken } from "../utils/token";
export const registerController = async (
  req: Request<{}, {}, registerInput>,
  res: Response<User | string>
) => {
  /**
   * DONE: validate request body to match regsiter criteria
   * DONE: check if email is unique in database or not
   * DONE: hash password
   * DONE: send jwt and created user
   */
  let { name, email, password } = req.body;
  let user = await pool.query(pg_format(getUser, "email", email));
  if (user.rows.length) return res.status(400).send("email already exist");

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user = await pool.query(createUser, [name, email, password]);

  const token = createToken({ _id: user.rows[0] });
  return res
    .header("x-auth-token", token)
    .send(_.pick(user.rows[0], ["name", "email"]) as User);
};

export const loginController = async (
  req: Request<{}, {}, loginInput>,
  res: Response<User | string>
) => {
  /**
   * DONE: validate reqeust body to match login criteria
   * DONE: check if email exist
   * DONE: compare passwords
   * DONE: every thing is ok ? return token and user data : return 400 error
   */
  const { email, password } = req.body;
  let user = await pool.query(pg_format(getUser, "email", email));
  if (!user.rows.length)
    return res.status(400).send("invalid user name or password");

  const validPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!validPassword)
    return res.status(400).send("invalid user name or password");
  const token = createToken({
    _id: user.rows[0].user_id,
    isAdmin: user.rows[0].isadmin,
  });

  return res
    .header("x-auth-token", token)
    .send(_.pick(user.rows[0], ["name", "email"]) as User);
};
