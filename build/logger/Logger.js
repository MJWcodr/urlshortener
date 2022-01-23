"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consola_1 = __importDefault(require("consola"));
class Logger {
    constructor() {
        this.logs = [];
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    addLog(text) {
        let now = new (Date);
        this.logs.push([now.toISOString(), text]);
    }
    info(text) {
        consola_1.default.info(text);
        this.addLog(text);
    }
    success(text) {
        consola_1.default.success(text);
        this.addLog(text);
    }
    error(text) {
        consola_1.default.error(text);
        this.addLog(text);
    }
}
exports.default = Logger;
