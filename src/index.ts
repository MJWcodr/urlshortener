// dependencies
import dotenv from "dotenv"

// modules
import Server from "./Server"

// variables
const port: number = Number(process.env.PORT) || 5555
// load dotenv 
dotenv.config()

const server = new Server()
server.start(port)