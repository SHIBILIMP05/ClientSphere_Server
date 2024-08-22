import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload';


import authRouter from '../routes/authRouter'
import dotenv from "dotenv"
import adminRouter from '../routes/adminRouter'

dotenv.config()
export const createServer = () => {

    try {
        const app = express()
        app.use(express.json())
        app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }))

        app.use(cors({
            origin: process.env.ORIGIN_URL,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            credentials: true
        }))

        app.use('/api/auth', authRouter)
        app.use('/api/admin', adminRouter)

        return app

    } catch (error) {
        console.error(error);

    }

}