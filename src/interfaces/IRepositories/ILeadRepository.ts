import { LeadData } from "../models/leads"

interface ILeadsRepository {
    createLead(leadData: LeadData): Promise<LeadData | null>,
    listNewLeads(): Promise<LeadData[] | null>,
    assignToEmploye(empId:string,selectedRows:string[]):Promise<LeadData[]|null>,
    listLeads_WithEmpId(empId:string):Promise<LeadData[]|null>,
    fetchLeadInfo(leadId:string):Promise<LeadData|null>,
    updateLeadInfo(leadId:string,leadData:LeadData):Promise<LeadData|null>,
}

export default ILeadsRepository 