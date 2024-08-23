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

    async findAll():Promise<Employee[]|null>{
        try {
            const employeList = await employeeModel.find()
            if(employeList){
                return employeList
            } else{
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

    async updateData(editDatas: Employee):Promise<Employee | null> {
        try {
            const updateEmploye = await employeeModel.findByIdAndUpdate(
                editDatas._id,
                {
                    name: editDatas.name,
                    email: editDatas.email,
                    address: editDatas.address,
                    city: editDatas.city,
                    country: editDatas.country,
                    pinCode: editDatas.pinCode,
                    phone: editDatas.phone,
                    image: editDatas.image,
                },
                { new: true }
            )
            console.log("updated admin-----",updateEmploye);
            
            if (updateEmploye) {
                return updateEmploye
            } else {
                return null
            }
        } catch (error) {
            console.error('Error updating admin data:', error);
            return null
        }


    }
}

export default EmployeeRepository;