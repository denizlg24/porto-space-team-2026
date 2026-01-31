import {z} from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),
    DB_NAME: z.string().min(1),
    PINATA_JWT_TOKEN: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    EMAIL_FROM: z.string().min(1),
    ZOOM_ACCOUNT_ID: z.string().min(1),
    ZOOM_CLIENT_ID: z.string().min(1),
    ZOOM_CLIENT_SECRET: z.string().min(1),
})

export const env = envSchema.parse(process.env);