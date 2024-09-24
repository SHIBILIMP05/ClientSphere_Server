import Employee from "../models/employee.js";
import { EmployeeOutPut } from "../models/employeeOutPut.ts";
import { LeadData } from "../models/leads.js";


interface IEmployeeUseCase{
    login(email:string,password:string):Promise<EmployeeOutPut>,
    editProfile(editDatas:Employee):Promise<EmployeeOutPut>,
    listMyLeads(empId:string):Promise<EmployeeOutPut>,
    fetchLeadInfo(leadId:string):Promise<EmployeeOutPut>, 
    updateLeadInfo(leadData:LeadData,leadId:string,empId:string):Promise<EmployeeOutPut>,
    listHistory(empId:string):Promise<EmployeeOutPut>
}

export default IEmployeeUseCase