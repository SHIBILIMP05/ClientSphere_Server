import { createServer } from "./infrastructure/config/app";
import { ConnectDB } from "./infrastructure/config/DBConfig";
import dotenv from "dotenv"

dotenv.config()
const startServer = async () => {
    try {
        ConnectDB()
        const app = createServer()
        app?.listen(5000, () => console.log("Server Connected Successfully"));

    } catch (error) {
        console.error(error);

    }
}

startServer()