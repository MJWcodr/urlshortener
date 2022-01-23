"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Logger_1 = __importDefault(require("./logger/Logger"));
const api_1 = __importDefault(require("./routes/api"));
const dataDir = "/frontend/build/";
const errorDir = "/public/errors/";
class Server {
    constructor() {
        const app = (0, express_1.default)();
        this.app = app;
        // middleware
        app.use(express_1.default.static(process.cwd() + dataDir));
        app.use(express_1.default.static(process.cwd() + errorDir));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(api_1.default);
        app.use('/api/v1/', api_1.default);
    }
    start(port) {
        const logger = Logger_1.default.getInstance();
        this.app.listen(port, () => logger.success(`Started server on http://localhost:${port}`));
    }
}
exports.default = Server;
