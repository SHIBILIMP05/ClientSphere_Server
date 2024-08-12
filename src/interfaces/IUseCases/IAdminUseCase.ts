import { AdminOutPut } from "../models/adminOutPut";

interface IAdminUsecase {
    login(email: string, password: string): Promise<AdminOutPut>,
    createEmployee(name:string,position:string,email:string):Promise<AdminOutPut>,
    listEmploye():Promise<AdminOutPut>
}

export default IAdminUsecase