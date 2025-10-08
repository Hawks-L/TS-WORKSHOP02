"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnv = loadEnv;
const dotenv_1 = __importDefault(require("dotenv"));
const dotenv_expand_1 = __importDefault(require("dotenv-expand"));
const env = dotenv_1.default.config();
dotenv_expand_1.default.expand(env);
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(3333),
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    JWT_SECRET: zod_1.z.string().min(8),
    DB_DATABASE: zod_1.z.string(),
    DB_PASSWORD: zod_1.z.string(),
    DB_HOST: zod_1.z.string().default('localhost'),
    DB_PORT: zod_1.z.coerce.number().default(5432),
    PGADMIN_DEFAULT_EMAIL: zod_1.z.email(),
    PGADMIN_DEFAULT_PASSWORD: zod_1.z.string().min(8),
    DATABASE_URL: zod_1.z.url(),
});
function loadEnv() {
    return envSchema.parse(process.env);
}
