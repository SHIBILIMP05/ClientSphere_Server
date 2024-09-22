import { LeadData } from "../models/leads"

interface ILeadsRepository {
    createLead(leadData: LeadData): Promise<LeadData | null>,
    listNewLeads(): Promise<LeadData[] | null>,
    assignToEmploye(empId:string,selectedRows:string[]):Promise<LeadData[]|null>,
}

export default ILeadsRepository 