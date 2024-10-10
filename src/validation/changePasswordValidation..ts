import { z } from "zod";

export const changePassValidation = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email" }),
  password: z.string().trim().min(6, { message: "password must be six characters" }),
  newPassword: z.string().trim().min(6, { message: "password must be six characters" }),
});
