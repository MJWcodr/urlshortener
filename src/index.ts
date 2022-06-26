// dependencies
import dotenv from "dotenv"

// modules
import Server from "./Server"

// variables
let port: number = Number(process.env.PORT) || 3000

if (process.argv[2] == "--dev"){
    port = Number(process.env.DEV_PORT) || 5555
}

// load dotenv 
dotenv.config()

const server = new Server()
server.start(port)