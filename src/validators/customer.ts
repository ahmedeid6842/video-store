import { isValidCustomerId } from "../utils/isValidId";
import zod from "zod";

export const createCustomerSchema = zod.object({
  isGold: zod.boolean().optional(),
  name: zod
    .string({ required_error: "customer name is required" })
    .min(5, "name too short - length should between 5 and 255")
    .max(255, "name too long - length should between 5 and 255"),
  phone: zod.string({ required_error: "customer phone number is required" }),
});

export const updateCustomerSchema = createCustomerSchema.partial();

export const validCustomerIdParam = zod.object({
  id: zod
    .string({ required_error: "customer id is required" })
    .refine(isValidCustomerId, (val) => ({
      message: `${val} invalid customerID`,
    })),
});

export type createCustomerInput = zod.infer<typeof createCustomerSchema>;
export type updateCustomerInput = zod.infer<typeof updateCustomerSchema>;
export type customerIdParamInput = zod.infer<typeof validCustomerIdParam>;
