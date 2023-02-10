import jwt from "jsonwebtoken";
import config from "config";
import { jwtPayload } from "../types/jwtPayload";

const JWT_SECRET = config.get<string>("JWT_SECRET");

export const createToken = (payload: jwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("invalid Token Provided");
  }
};
