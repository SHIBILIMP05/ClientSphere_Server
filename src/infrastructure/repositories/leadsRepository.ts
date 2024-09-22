import leadsModel from "../../entities_models/LeadsModel";
import ILeadsRepository from "../../interfaces/IRepositories/ILeadRepository";
import { LeadData } from "../../interfaces/models/leads";


class LeadsRepository implements ILeadsRepository {

    async createLead(leadData: LeadData): Promise<LeadData | null> {
        try {

            const lead = await leadsModel.create({
                ...leadData,
                lead_status: 'New lead',
                lead_holder: 'none'
            })
            if (lead) {
                return lead
            } else {
                return null
            }
        } catch (error) {
            console.error(error);
            return null
        }
    }

    async listNewLeads(): Promise<LeadData[] | null> {
        const newLeads = await leadsModel.find({ lead_holder: 'none' })
        if (newLeads) {
            return newLeads
        } else {
            return null
        }
    }

    async assignToEmploye(empId: string, selectedRows: string[]): Promise<LeadData[] | null> {


        const assignEmployee = await leadsModel.updateMany(
            { _id: { $in: selectedRows } },
            { $set: { lead_holder: empId } },
        )
        if (assignEmployee.acknowledged && assignEmployee.modifiedCount > 0) {
            const updatedLeads = await leadsModel.find({ lead_holder: 'none' });
            return updatedLeads; // Return the updated leads
        } else {
            console.error('No leads were updated');
            return null;
        }

    }
}
export default LeadsRepository