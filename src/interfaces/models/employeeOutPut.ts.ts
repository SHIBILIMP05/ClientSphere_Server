import Employee from "./employee";

export interface EmployeeOutPut {
    status: number,
    message: string,
    accessToken?: string,
    data?:Employee,
}