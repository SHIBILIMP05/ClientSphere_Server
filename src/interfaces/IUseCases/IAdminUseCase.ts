import Admin from "../models/admin";
import { AdminOutPut } from "../models/adminOutPut";
import { LeadData } from "../models/leads";

interface IAdminUsecase {
    login(email: string, password: string): Promise<AdminOutPut>,
    createEmployee(name:string,position:string,email:string):Promise<AdminOutPut>,
    listEmploye(page:number):Promise<AdminOutPut>,
    editProfile(editDatas:Admin):Promise<AdminOutPut>,
    blockEmployee(id:string):Promise<AdminOutPut>,
    submitLeadsForm(leadData:LeadData):Promise<AdminOutPut>,

}

export default IAdminUsecase