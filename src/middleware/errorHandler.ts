import { ErrorRequestHandler } from "express";
import { log } from "../utils/logger";
export const errorHandlerMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  log.error(err);
  return res.status(500).send("something went wrong");
};
