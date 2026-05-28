import { z } from 'zod';

const NATIONAL_ID_REGEX = /^\d{13}$/;
const PHONE_REGEX = /^\d{10}$/;

export const loginSchema = z.object({
  credential: z
    .string()
    .min(1, 'Please enter your National ID or phone number')
    .refine(
      (val) => NATIONAL_ID_REGEX.test(val) || PHONE_REGEX.test(val),
      'Enter a valid 13-digit National ID or 10-digit phone number',
    ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
