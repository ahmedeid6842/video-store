import { Request, Response, NextFunction } from "express";
import {RequestValidators} from "../types/RequestValidators";

const validate =
  (validators: RequestValidators) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }
      return next();
    } catch (error: any) {
      return res.status(400).send(error);
    }
  };

export default validate;
