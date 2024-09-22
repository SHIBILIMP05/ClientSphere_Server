import Employee from "./employee";
import Head from "./head";
import { LeadData } from "./leads";

export interface HeadOutPut {
    status: number,
    message: string,
    accessToken?: string,
    data?:Head,
    newLeads?:LeadData[],
    employeeList?:Employee[]
}