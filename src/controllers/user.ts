import { Request, Response } from "express";
import bcrypt from "bcrypt";
import _ from "lodash";
import { UserType } from "../types/User";
import { loginInput, registerInput } from "../validators/user";
import { User } from "../database/entities/index";
import { createToken } from "../utils/token";

export const registerController = async (
  req: Request<{}, {}, registerInput>,
  res: Response<UserType | string>
) => {
  /**
   * DONE: validate request body to match regsiter criteria
   * DONE: check if email is unique in database or not
   * DONE: hash password
   * DONE: send jwt and created user
   */
  let { name, email, password } = req.body;
  let userExist = await User.findOne({ where: { email } });
  if (userExist) return res.status(400).send("email already exist");

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  [name, email, password];

  let user = await User.createQueryBuilder()
    .insert()
    .into(User)
    .values({ name, email, password })
    .returning("*")
    .execute();

  const token = createToken({ _id: user.raw[0].user_id });

  return res
    .header("x-auth-token", token)
    .send(_.pick(user.raw[0], ["name", "email"]) as UserType);
};

export const loginController = async (
  req: Request<{}, {}, loginInput>,
  res: Response<UserType | string>
) => {
  /**
   * DONE: validate reqeust body to match login criteria
   * DONE: check if email exist
   * DONE: compare passwords
   * DONE: every thing is ok ? return token and user data : return 400 error
   */
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).send("invalid user name or password");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("invalid user name or password");

    const token = createToken({
      _id: user.user_id,
      isAdmin: user.isAdmin,
    });

    return res
      .header("x-auth-token", token)
      .send(_.pick(user, ["name", "email"]) as UserType);
  } catch (error) {
    throw new Error(error);
  }
};
