"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerBootstrap = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const prisma_1 = require("../infrastructure/db/prisma");
const ConfigServer_1 = require("./ConfigServer");
const logger_1 = require("./logger");
class ServerBootstrap extends ConfigServer_1.ConfigServer {
    _app = (0, express_1.default)();
    _port;
    _logger;
    constructor() {
        super();
        this._port = this.getNumberEnv("PORT");
        this._logger = (0, logger_1.createLogger)(this.env);
        this.configureMiddleware();
        for (const r of this._routers()) {
            this._app.use("/api", r);
        }
        this.listen();
        this.handleShutdown();
    }
    configureMiddleware() {
        this._app.use(express_1.default.json());
        this._app.use(express_1.default.urlencoded({ extended: true }));
        this._app.use((0, cors_1.default)());
        this._app.use((0, morgan_1.default)("dev"));
    }
    listen() {
        this._app.listen(this._port, async () => {
            this._logger.info(`Server listen on port: ${this._port} in ${this.getEnvironment("NODE_ENV")} mode`);
            this._logger.info(`http://localhost:${this._port}`);
            await this.dbConnection();
        });
    }
    async dbConnection() {
        try {
            await prisma_1.prismaClient.$connect();
            this._logger.info("Prisma connected to the database");
        }
        catch (error) {
            this._logger.error({
                msg: "Error connecting Prisma to the database",
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            });
            throw error;
        }
    }
    handleShutdown() {
        const shutdown = async (signal) => {
            try {
                await prisma_1.prismaClient.$disconnect();
                this._logger.info(`Prisma disconnected on ${signal}`);
            }
            catch (e) {
                this._logger.error({ msg: "Error during Prisma disconnection", error: e });
            }
            finally {
                process.exit(0);
            }
        };
        process.on("SIGINT", () => shutdown("SIGINT"));
        process.on("SIGTERM", () => shutdown("SIGTERM"));
    }
    _routers = () => {
        // TODO: add route modules here, e.g., userRouter, authRouter, etc.
        return [];
    };
}
exports.ServerBootstrap = ServerBootstrap;
