import Employee from "../models/employee";


interface IEmployeeRepository{
    findByEmail(email:string):Promise<Employee|null>,
}

export default IEmployeeRepository;