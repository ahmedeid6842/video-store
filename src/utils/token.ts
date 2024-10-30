import jwt from "jsonwebtoken";
import config from "config";
import { jwtPayload } from "../types/jwtPayload";


export const createToken = (payload: jwtPayload) => {
  const JWT_SECRET = config.get<string>("JWT_SECRET");
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};

export const verifyToken = (token: string) => {
  try {
    const JWT_SECRET = config.get<string>("JWT_SECRET");
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("invalid Token Provided");
  }
};
