import { EmployeeOutPut } from "../models/employeeOutPut.ts";


interface IEmployeeUseCase{
    login(email:string,password:string):Promise<EmployeeOutPut>,
}

export default IEmployeeUseCase