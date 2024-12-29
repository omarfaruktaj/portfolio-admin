import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password can't be more then 50 characters long" }),
});


export const registerSchema = z.object({
  first_name: z.string().trim().min(1, 'First name is required'),

  last_name: z.string().trim().min(1, 'Last name is required'),

  email: z
    .string()
    .trim()
    .email('Invalid email format')
    .min(1, 'Email is required'),

password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password can't be more then 50 characters long" }),
  
});

export type  LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;