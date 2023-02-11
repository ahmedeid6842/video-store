import zod from "zod";

export const loginSchema = zod.object({
  email: zod
    .string({
      required_error: "user email is requird",
    })
    .min(5, "email too short -length must between 5 and 255")
    .max(255, "email too long -length must between 5 and 255"),
  password: zod.string({
    required_error: "user password is required",
  }),
});

export const registerSchema = loginSchema.extend({
  name: zod
    .string({
      required_error: "user name is required",
    })
    .min(5, "name too short -length must between 5 and 50")
    .max(50, "name too long -length must between 5 and 50"),
});

export type loginInput = zod.infer<typeof loginSchema>;
export type registerInput = zod.infer<typeof registerSchema>;
