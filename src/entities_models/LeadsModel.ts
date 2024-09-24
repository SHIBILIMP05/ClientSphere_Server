import mongoose, { model, Schema } from "mongoose";
import { LeadData } from "../interfaces/models/leads";


const leadsSchema: Schema<LeadData> = new Schema({
    name: {
        type: String

    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    company: {
        type: String
    },
    leadSource: {
        type: String
    },
    message: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    pinCode: {
        type: String
    },
    lead_holder: {
        type: String,
        ref: 'employee',
        
    },
    lead_status: {
        type: String
    },
    date:{
        type:Date
    }
})

const leadsModel = model<LeadData>('leads', leadsSchema)

export default leadsModel;