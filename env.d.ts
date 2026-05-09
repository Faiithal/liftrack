import { z } from 'zod';
declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        production: "production";
        test: "test";
        development: "development";
    }>>;
    APP_STAGE: z.ZodDefault<z.ZodEnum<{
        dev: "dev";
        production: "production";
        test: "test";
    }>>;
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    HOST: z.ZodDefault<z.ZodString>;
    DATABASE_URL: z.ZodString;
    DATABASE_POOL_MIN: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    DATABASE_POOL_MAX: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    JWT_SECRET: z.ZodString;
    JWT_EXPIRES_IN: z.ZodOptional<z.ZodString>;
    REFRESH_TOKEN_SECRET: z.ZodOptional<z.ZodString>;
    BCRYPT_ROUNDS: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    CORS_ORIGIN: z.ZodDefault<z.ZodPipe<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString>]>, z.ZodTransform<string[], string | string[]>>>;
    LOG_LEVEL: z.ZodDefault<z.ZodEnum<{
        error: "error";
        warn: "warn";
        info: "info";
        debug: "debug";
        trace: "trace";
    }>>;
}, z.core.$strip>;
export type Env = z.infer<typeof envSchema>;
declare let env: Env;
export declare const isProd: () => boolean;
export declare const isDev: () => boolean;
export declare const isTestEnv: () => boolean;
export { env };
export default env;
//# sourceMappingURL=env.d.ts.map