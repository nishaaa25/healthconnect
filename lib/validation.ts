import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(6, {
      message: "Username must be at least 10 characters.",
    })
    .max(50, {
      message: "Username must be at most 50 characters.",
    }),
  email: z.string().email("Inavlid email address."),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

