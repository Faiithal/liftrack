import { env as loadEnv } from 'custom-env';
import { z, ZodError } from 'zod';
// Determine application stage
process.env.APP_STAGE = process.env.APP_STAGE || 'dev';
const isProduction = process.env.APP_STAGE == 'production';
const isDevelopment = process.env.APP_STAGE == 'dev';
const isTest = process.env.APP_STAGE == 'test';
// Load .env files based on environment
if (isDevelopment) {
    loadEnv();
}
else if (isTest) {
    loadEnv('test');
}
// Define validation schema with Zod
const envSchema = z.object({
    // Magic... not really but it's validation for the env
    // Node environment
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
    APP_STAGE: z
        .enum(['dev', 'test', 'production'])
        .default('dev'),
    // Server Configuration
    PORT: z.coerce.number().positive().default(3000),
    HOST: z.string().default('localhost'),
    // Database
    DATABASE_URL: z.string().startsWith('postgresql://'),
    DATABASE_POOL_MIN: z.coerce.number().min(0).default(2),
    DATABASE_POOL_MAX: z.coerce.number().positive().default(10),
    // JWT & Authentication
    JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
    JWT_EXPIRES_IN: z.string().min(32).optional(),
    REFRESH_TOKEN_SECRET: z.string().min(32).optional(),
    // Security 
    BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12),
    // CORS Configuration
    CORS_ORIGIN: z
        .string()
        .or(z.array(z.string()))
        .transform((val) => {
        if (typeof val == 'string') {
            return val.split(',').map((origin) => origin.trim());
        }
        return val;
    })
        .default([]),
    // Logging
    LOG_LEVEL: z
        .enum(['error', 'warn', 'info', 'debug', 'trace'])
        .default(isProduction ? 'info' : 'debug')
});
// -- Environment Validation and Error Handling --
// Parse and validate environment variables
let env;
try {
    env = envSchema.parse(process.env);
}
catch (error) {
    if (error instanceof ZodError) {
        console.error("❌ Invalid environment variables: ");
        console.error(z.treeifyError(error));
        process.exit(1);
    }
    throw error; // Make note of the behavior of throwing errors
}
// Helper functions for environment checks
export const isProd = () => env.NODE_ENV == 'production';
export const isDev = () => env.NODE_ENV == 'development';
export const isTestEnv = () => env.NODE_ENV == 'test';
// export validated environment
export { env };
export default env;
//# sourceMappingURL=env.js.map