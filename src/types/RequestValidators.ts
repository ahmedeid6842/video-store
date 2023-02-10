import { AnyZodObject } from "zod";

export type RequestValidators = {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
};
