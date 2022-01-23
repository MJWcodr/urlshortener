import consola from "consola";

export default class Logger {
    private logs: object[];
    private static instance: Logger;

    private constructor() {
        this.logs = []
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger()
        }
        return Logger.instance
    }
    public addLog(text: any) {
        let now = new (Date)
        this.logs.push([now.toISOString(), text])
    }

    public info(text: string) {
        consola.info(text)
        this.addLog(text)
    }
    public success(text: string) {
        consola.success(text)
        this.addLog(text)
    }
    public error(text: string) {
        consola.error(text)
        this.addLog(text)
    }
}