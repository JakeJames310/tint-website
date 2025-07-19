import { z } from 'zod';

// Define schema for required environment variables
const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  // Add more required env vars here as needed
});

// Parse and validate process.env
const _env = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  // Add more env vars here as needed
};

const parsed = envSchema.safeParse(_env);

if (!parsed.success) {
  // Print all validation errors and exit fast
  console.error('❌ Invalid environment variables:', parsed.error.format());
  throw new Error('Invalid environment variables. See above for details.');
}

export const env = parsed.data;
