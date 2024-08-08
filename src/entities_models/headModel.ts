import { model, Schema } from "mongoose";
import Head from "../interfaces/models/head";



const headSchema:Schema<Head> = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const headModel = model <Head>('head',headSchema)

export default headModel;