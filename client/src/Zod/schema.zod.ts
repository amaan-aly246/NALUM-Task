import { z } from "zod"

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name must not be empty "),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Invalid email address",
    }),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long."),
})

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Invalid email address",
    }),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long."),
})
