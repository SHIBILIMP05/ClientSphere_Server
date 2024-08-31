import { AdminOutPut } from "../models/adminOutPut";
import Employee from "../models/employee";


interface IEmployeeRepository{
    findByEmail(email:string):Promise<Employee|null>,
    findById(id:string):Promise<Employee|null>,
    createEmploye(employeeData:Employee):Promise<Employee|null>,
    listEmploye(page:number):Promise<AdminOutPut|null>,
    updateData(editDatas: Employee): Promise<Employee | null>,
    restrictAction(id:string,value:boolean):Promise<Employee|null>,

}

export default IEmployeeRepository;