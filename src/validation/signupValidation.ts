import { z } from "zod";

export const signupValidation = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, { message: "Name is required" }),
  email: z.string().trim().email({ message: "Email is required" }),
  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(1, { message: "Number is required" }),
  gender: z
    .string({ required_error: "Gender is required" })
    .trim()
    .min(1, { message: "Gender is required" }),
  age: z
    .string({ required_error: "Age is required" }).min(1, { message: "age is required" })
    .refine((val) => !isNaN(Number(val)), { message: "Age must be a number" }),
  address: z
    .string({ required_error: "Address is required" })
    .trim()
    .min(1, { message: "address is required" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least six characters" }),
});
