import { env as loadEnv } from 'custom-env'
import { z } from 'zod'

// Determine application stage
process.env.APP_STAGE = process.env.APP_STAGE || 'dev'

const isProduction = process.env.APP_STAGE == 'production'
const isDevelopment = process.env.APP_STAGE == 'dev'
const isTest = process.env.APP_STAGE == 'test'

// Load .env files based on environment
if (isDevelopment) {
    loadEnv()
} else if (isTest) {
    loadEnv('test')
}

// Define validation schema with Zod
const envSchema = z.object({
    // TODO: Add Validation
    // Magic... not really but it's validation for the env
})

// Type Inference from Schema
export type Env = z.infer<typeof envSchema>


// -- Environment Validation and Error Handling --

// Parse and validate environment variables
let env: Env

try {
    env = envSchema.parse(process.env)
} catch (error) {
    // TODO: add Error logic
    throw error // Make note of the behavior of throwing errors
}

// Helper functions for environment checks
export const isProd = () => env.NODE_ENV == 'production'
export const isDev = () => env.NODE_ENV == 'dev'
export const isTestEnv = () => env.NODE_ENV == 'test'

// export validated environment
export { env }
export default env