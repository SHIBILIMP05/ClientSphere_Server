import { EmployeeOutPut } from "../models/employeeOutPut.ts"
import { HeadOutPut } from "../models/headOutPut"
import { LeadData } from "../models/leads"

interface ILeadsRepository {
    createLead(leadData: LeadData): Promise<LeadData | null>,
    listNewLeads(page: number): Promise<HeadOutPut | null>,
    assignToEmploye(empId: string, selectedRows: string[]): Promise<LeadData[] | null>,
    listLeads_WithEmpId(empId: string, page: number, search?: string, status?: string, date?: string): Promise<EmployeeOutPut | null>,
    fetchLeadInfo(leadId: string): Promise<LeadData | null>,
    updateLeadInfo(leadId: string, leadData: LeadData): Promise<LeadData | null>,
    addLeadByEmployee(empId: string, leadData: LeadData): Promise<LeadData | null>,
    excelUpload(leads: LeadData[],empId:string): Promise<LeadData[] | null>
}

export default ILeadsRepository 