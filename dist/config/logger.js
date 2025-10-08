"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = createLogger;
const pino_1 = __importDefault(require("pino"));
function createLogger(env) {
    return (0, pino_1.default)({
        level: env.NODE_ENV === 'production' ? 'info' : 'debug',
        transport: env.NODE_ENV === 'production' ? undefined : {
            targets: [
                {
                    level: "info",
                    target: 'pino/file',
                    options: {
                        destination: "./logs/actions.log",
                        mkdir: true
                    }
                },
                {
                    level: "info",
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                        translateTime: "SYS:standard"
                    }
                },
                {
                    level: "error",
                    target: "pino/file",
                    options: {
                        destination: "./logs/errors.log",
                        mkdir: true
                    }
                },
                {
                    level: "error",
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                        translateTime: "SYS:standard"
                    }
                },
            ]
        },
    });
}
