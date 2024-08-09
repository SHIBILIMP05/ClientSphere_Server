import { model, Schema } from "mongoose";
import Employee from "../interfaces/models/employee";



const employeeSchema:Schema<Employee> = new Schema({
    name: {
        type: String
    },
    ID: {
        type: String,
        required: true
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
    is_teamLead: {
        type: Boolean,
        default:false
    },
    is_restricted: {
        type: Boolean,
        default:false
    }
})

const employeeModel = model <Employee>('employee',employeeSchema)

export default employeeModel;