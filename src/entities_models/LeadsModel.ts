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
    pinCode: {
        type: String
    },
    lead_holder: {
        type: { type: mongoose.Schema.Types.ObjectId,
        ref: 'employee' }
    },
    lead_status: {
        type: String
    }
})

const leadsModel = model<LeadData>('leads', leadsSchema)

export default leadsModel;