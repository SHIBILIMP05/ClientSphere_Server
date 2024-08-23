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
    position:{
        type:String,
        require:true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    pinCode:{
        type:String
    },
    phone:{
        type:String
    },
})

const headModel = model <Head>('head',headSchema)

export default headModel;