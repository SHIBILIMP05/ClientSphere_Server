import express from 'express'
import cors from 'cors'


import authRouter from '../routes/authRouter'

export const createServer = () => {

    try {
        const app = express()
        app.use(express.json())

        app.use(cors({
            origin: process.env.ORIGIN_URL,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            credentials: true
        }))

        app.use('/admin',authRouter)

        return app

    } catch (error) {
        console.error(error);
        
    }

}