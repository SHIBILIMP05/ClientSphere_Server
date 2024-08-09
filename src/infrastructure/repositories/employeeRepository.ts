import employeeModel from "../../entities_models/employeeModel";
import IEmployeeRepository from "../../interfaces/IRepositories/IEmployeeRepository";
import Employee from "../../interfaces/models/employee";


class EmployeeRepository implements IEmployeeRepository {
    async findByEmail(email:string):Promise<Employee|null>{
        try {
            const employe = await employeeModel.findOne({email:email})
            if(employe){
                return employe
            }else{
                return null
            }
        } catch (error) {
            console.error(error);
            return null
        }
    }
}

export default EmployeeRepository;