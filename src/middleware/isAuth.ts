import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("no token provided");
  try {
    res.locals.user = verifyToken(token);
    return next();
  } catch (ex) {
    return res.status(400).send(ex.message);
  }
};
