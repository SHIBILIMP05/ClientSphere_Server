import { model, Schema } from "mongoose";
import admin from "../interfaces/models/admin";


const adminSchema: Schema<admin> = new Schema({
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

const adminModel = model<admin>('admin', adminSchema)

export default adminModel;