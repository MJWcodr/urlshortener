"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dependencies
const dotenv_1 = __importDefault(require("dotenv"));
// modules
const Server_1 = __importDefault(require("./Server"));
// variables
const port = Number(process.env.PORT) || 5555;
// load dotenv 
dotenv_1.default.config();
const server = new Server_1.default();
server.start(port);
