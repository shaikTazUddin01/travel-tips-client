import { z } from "zod";

export const forgotPassValidation = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email" }),
  newPassword: z.string().trim().min(6, { message: "password must be six characters" }),
});
