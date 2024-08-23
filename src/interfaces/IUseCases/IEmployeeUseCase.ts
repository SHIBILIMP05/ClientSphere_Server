import Employee from "../models/employee.js";
import { EmployeeOutPut } from "../models/employeeOutPut.ts";


interface IEmployeeUseCase{
    login(email:string,password:string):Promise<EmployeeOutPut>,
    editProfile(editDatas:Employee):Promise<EmployeeOutPut>

}

export default IEmployeeUseCase