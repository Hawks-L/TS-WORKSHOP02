import { EnvVariables, loadEnv } from "./env.config";
import * as dotenv from 'dotenv'

export abstract class ConfigServer {
    public readonly env: EnvVariables

    constructor() {
        const nodeNameEnv: string = this.createPathEnv(this.nodeEnv)
        dotenv.config({
            path: nodeNameEnv
        })
        this.env = loadEnv()
    }

    protected getEnvironment(key: keyof typeof this.env): string | number {
        return this.env[key];
    }

    protected getNumber(key: keyof typeof this.env): number {
        return Number(this.env[key]);
    }

    protected get nodeEnv(): string {
        return process.env['NODE_ENV']?.trim() || "";
    }

    protected get databaseUrl(): string {
        return this.getEnvironment('DATABASE_URL').toString();
    }
    
    protected createPathEnv(path: string): string {
        const arrayEnv: string[] = ["env"]

        if (path.length) {
            const stringToArray: string[] = path.split('.')
            arrayEnv.unshift(...stringToArray)
        }

        return `.${arrayEnv.join(".")}`;
    }

    protected getNumberEnv(key: keyof EnvVariables): number {
  const raw = this.getEnvironment(key);
  const num = typeof raw === 'number' ? raw : Number(raw);
  if (Number.isNaN(num)) {
    throw new Error(`Env ${String(key)} must be a number, got: ${String(raw)}`);
  }
  return num;
}

}