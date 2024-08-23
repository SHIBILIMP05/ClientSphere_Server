import { model, Schema } from "mongoose";
import Employee from "../interfaces/models/employee";



const employeeSchema:Schema<Employee> = new Schema({
    name: {
        type: String
    },
    email:{
        type:String
    },
    phone: {
        type: Number,
        
    },
    position: {
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
    is_restricted: {
        type: Boolean,
        default:false
    }
})

const employeeModel = model <Employee>('employee',employeeSchema)

export default employeeModel;