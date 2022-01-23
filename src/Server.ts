import express from "express"
import Logger from "./logger/Logger";
import { Express } from "express"
import api from "./routes/api";

const dataDir = "/frontend/build/"
const errorDir = "/public/errors/"

export default class Server {
    private app: Express;

    constructor() {
        const app = express();
        this.app = app;

        // middleware
        app.use(express.static(process.cwd() + dataDir))
        app.use(express.static(process.cwd() + errorDir))

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        
        app.use(api)
        app.use('/api/v1/', api)

    }

    start(port: number) {
        const logger = Logger.getInstance()
        this.app.listen(port, () => logger.success(
            `Started server on http://localhost:${port}`
        ))
    }
}