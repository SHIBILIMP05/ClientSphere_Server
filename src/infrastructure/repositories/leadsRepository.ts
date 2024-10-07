import leadsModel from "../../entities_models/LeadsModel";
import ILeadsRepository from "../../interfaces/IRepositories/ILeadRepository";
import { EmployeeOutPut } from "../../interfaces/models/employeeOutPut.ts";
import { HeadOutPut } from "../../interfaces/models/headOutPut";
import { LeadData } from "../../interfaces/models/leads";


class LeadsRepository implements ILeadsRepository {

    async createLead(leadData: LeadData): Promise<LeadData | null> {
        try {

            const lead = await leadsModel.create({
                ...leadData,
                lead_status: 'New lead',
                lead_holder: 'none',
                date: new Date()
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



    async listNewLeads(page: number): Promise<HeadOutPut | null> {
        const limit: number = 10;
        const skipCount: number = page * limit
        const totalCount: number = await leadsModel.countDocuments({ lead_holder: 'none' });
        const newLeads = await leadsModel.find({ lead_holder: 'none' }).skip(skipCount).limit(limit)
        if (newLeads) {
            return {
                newLeads,
                count: Math.ceil(totalCount / limit)
            }
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
            return updatedLeads;
        } else {
            console.error('No leads were updated');
            return null;
        }

    }

    async listLeads_WithEmpId(empId: string, page: number, search?: string, status?: string, date?: string): Promise<EmployeeOutPut | null> {
        const limit: number = 10;
        const skipCount: number = page * limit


        const query: any = { lead_holder: empId };

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        if (status) {
            const statusArray = status.split(',')
            query.lead_status = { $in: statusArray };
        }

        if (date) {

            const dateObj = new Date(date);

            const startOfDay = new Date(dateObj);
            startOfDay.setUTCHours(0, 0, 0, 0);

            const endOfDay = new Date(dateObj);
            endOfDay.setUTCHours(23, 59, 59, 999);

            query.date = { $gte: startOfDay, $lte: endOfDay };
        }
        const totalCount: number = await leadsModel.countDocuments(query);
        const leadsList = await leadsModel.find(query).skip(skipCount).limit(limit).sort({ date: -1 })
       console.log("leadsList==>",leadsList)
        if (leadsList) {
            return {
                leadsList,
                count: Math.ceil(totalCount / limit)
            }
        } else {
            return null
        }
    }

    async fetchLeadInfo(leadId: string): Promise<LeadData | null> {
        const leadInfo = await leadsModel.findById(leadId).populate('lead_holder')
        console.log('leadInfo', leadInfo);

        if (leadInfo) {
            return leadInfo
        } else {
            return null
        }
    }

    async updateLeadInfo(leadId: string, leadData: LeadData): Promise<LeadData | null> {
        const updatedLead = await leadsModel.findOneAndUpdate(
            { _id: leadId },
            {
                $set: {
                    name: leadData.name,
                    email: leadData.email,
                    phone: leadData.phone,
                    company: leadData.company,
                    leadSource: leadData.leadSource,
                    city: leadData.city,
                    country: leadData.country,
                    state: leadData.state,
                    pinCode: leadData.pinCode,
                    lead_status: leadData.lead_status,
                },
            },
            { new: true }
        );
        console.log("updated data", updatedLead);

        if (updatedLead) {
            return updatedLead
        } else {
            return null
        }
    }

    async addLeadByEmployee(empId: string, leadData: LeadData): Promise<LeadData | null> {
        const addLead = await leadsModel.create({
            ...leadData,
            lead_status: 'New lead',
            lead_holder: empId,
            date: new Date()

        })
        console.log('addLead', addLead);

        if (addLead) {
            return addLead
        } else {
            return null
        }
    }
}
export default LeadsRepository