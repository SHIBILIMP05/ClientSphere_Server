import Employee from "./employee";
import { History } from "./history";
import { LeadData } from "./leads";

export interface EmployeeOutPut {
    status?: number,
    message?: string,
    accessToken?: string,
    data?: Employee,
    leadsList?: LeadData[],
    leadInfo?: LeadData,
    historyList?: History[],
    count?:number
}