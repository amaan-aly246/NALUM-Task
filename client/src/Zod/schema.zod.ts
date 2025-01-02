import { z } from "zod"

export const signupSchema = z.object({
  name: z.string().min(1, "Name must not be empty "),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long."),
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long."),
})
