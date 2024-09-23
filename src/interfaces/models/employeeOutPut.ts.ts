import Employee from "./employee";
import { LeadData } from "./leads";

export interface EmployeeOutPut {
    status: number,
    message: string,
    accessToken?: string,
    data?:Employee,
    leadsList?:LeadData[],
    leadInfo?:LeadData
}