import {z} from 'zod';

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    JWT_SECRET: z.string().min(8),

    DB_DATABASE: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_HOST: z.string().default('localhost'),
    DB_PORT: z.coerce.number().default(5432),

    PGADMIN_DEFAULT_EMAIL: z.email(),
    PGADMIN_DEFAULT_PASSWORD: z.string().min(8),

    DATABASE_URL: z.url(),


})

export type EnvVariables = z.infer<typeof envSchema>

export function loadEnv(): EnvVariables{
    return envSchema.parse(process.env)
}