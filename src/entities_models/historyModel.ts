import { model, Schema } from "mongoose";
import { History } from "../interfaces/models/history";


const historySchema: Schema<History> = new Schema({
    empId: {
        type: String,
        ref: 'employee',
    },
    leadId: {
        type: String,
        ref: 'leads',
    },
    message: {
        type: String,
        required:true
    },
    date: {
        type:Date
    },
    
})

const historyModel = model<History>('history', historySchema)

export default historyModel;