import Employee from "../models/employee";


interface IEmployeeRepository{
    findByEmail(email:string):Promise<Employee|null>,
    createEmploye(employeeData:Employee):Promise<Employee|null>,
    findAll():Promise<Employee[]|null>
}

export default IEmployeeRepository;