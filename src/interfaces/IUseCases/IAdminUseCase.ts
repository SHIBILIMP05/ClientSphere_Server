import Admin from "../models/admin";
import { AdminOutPut } from "../models/adminOutPut";

interface IAdminUsecase {
    login(email: string, password: string): Promise<AdminOutPut>,
    createEmployee(name:string,position:string,email:string):Promise<AdminOutPut>,
    listEmploye():Promise<AdminOutPut>,
    editProfile(editDatas:Admin):Promise<AdminOutPut>
    blockEmployee(id:string):Promise<AdminOutPut>

}

export default IAdminUsecase