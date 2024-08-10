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

    async createEmploye(employeeData:Employee):Promise<Employee|null>{
        try {
           
            
            const addEmploye = await employeeModel.create({
                name:employeeData.name,
                position:employeeData.position,
                ID:employeeData.ID,
                email:employeeData.email,
                password:employeeData.password

            })

            if(addEmploye){
                return addEmploye
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