import { Response, NextFunction } from "express";
export const isAdmin = ({}, res: Response, next: NextFunction) => {
  if (!res.locals.user.isAdmin) return res.status(403).send("forbiden");
  return next();
};
