import { registerInput } from "../validators/user";

export type User = Omit<registerInput, "password">;
