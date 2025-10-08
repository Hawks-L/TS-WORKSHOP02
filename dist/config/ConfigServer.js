"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigServer = void 0;
const env_config_1 = require("./env.config");
const dotenv = __importStar(require("dotenv"));
class ConfigServer {
    env;
    constructor() {
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        dotenv.config({
            path: nodeNameEnv
        });
        this.env = (0, env_config_1.loadEnv)();
    }
    getEnvironment(key) {
        return this.env[key];
    }
    getNumber(key) {
        return Number(this.env[key]);
    }
    get nodeEnv() {
        return process.env['NODE_ENV']?.trim() || "";
    }
    get databaseUrl() {
        return this.getEnvironment('DATABASE_URL').toString();
    }
    createPathEnv(path) {
        const arrayEnv = ["env"];
        if (path.length) {
            const stringToArray = path.split('.');
            arrayEnv.unshift(...stringToArray);
        }
        return `.${arrayEnv.join(".")}`;
    }
    getNumberEnv(key) {
        const raw = this.getEnvironment(key);
        const num = typeof raw === 'number' ? raw : Number(raw);
        if (Number.isNaN(num)) {
            throw new Error(`Env ${String(key)} must be a number, got: ${String(raw)}`);
        }
        return num;
    }
}
exports.ConfigServer = ConfigServer;
