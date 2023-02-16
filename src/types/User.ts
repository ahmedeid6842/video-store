import { registerInput } from "../validators/user";

export type UserType = Omit<registerInput, "password">;
