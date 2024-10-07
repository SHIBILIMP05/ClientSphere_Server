import EmployeeRepository from "../infrastructure/repositories/employeeRepository";
import HeadRepository from "../infrastructure/repositories/headRepository";
import LeadsRepository from "../infrastructure/repositories/leadsRepository";
import IHeadUseCase from "../interfaces/IUseCases/IHeadUseCase";
import Head from "../interfaces/models/head";
import { HeadOutPut } from "../interfaces/models/headOutPut";
import { LeadData } from "../interfaces/models/leads";
import Jwt from "../providers/jwt";
import ManagePassword from "../providers/managePassword";

class HeadUseCase implements IHeadUseCase {
    constructor(
        private readonly _headRepo: HeadRepository,
        private readonly _leadRepo: LeadsRepository,
        private readonly _employeeRepo:EmployeeRepository,
        private readonly _jwt: Jwt,
        private readonly _managePassword: ManagePassword
    ) { }

    async login(email: string, password: string): Promise<HeadOutPut> {
        const head = await this._headRepo.findByEmail(email)
        if (head) {
            const match = await this._managePassword.verifyPassword(password, head.password as string)
            console.log('match === ', match);
            if (!match) {
                return {
                    status: 400,
                    message: "Invalid Credential"
                }
            }
            const accessToken = this._jwt.createAccessToken(head._id as string, 'head')
            return {
                status: 200,
                message: "Login Successfully",
                accessToken: accessToken,
                data:head
            }
        } else {
            return {
                status: 400,
                message: "Data not found."
            }
        }
    }

    async editProfile(editDatas: Head) {
        const editProfileResponse = await this._headRepo.updateData(editDatas)
        if (editProfileResponse) {
            return {
                status: 200,
                message: "success",
                data: editProfileResponse
            }
        } else {
            return {
                status: 400,
                message: 'Data Not Found'
            }
        }

    }

    async listNewLeads(page:number):Promise<HeadOutPut>{
        const response = await this._leadRepo.listNewLeads(page)
        if(response){
            return{
                status:200,
                message:'Success response',
                newLeads:response.newLeads,
                count:response.count
            }
        }else{
            return {
                status:400,
                message:'Data not founded'
            }
        }
    }

    async listEmployee():Promise<HeadOutPut>{
        const response = await this._employeeRepo.listEmploye()
        if(response){
            return{
                status:200,
                message:'Success response',
                employeeList:response.employeList
            }
        }else{
            return {
                status:400,
                message:'Somthing went wrong data not founded.'
            }
        }
    }

    async assignLeads(empId:string,selectedRows:string[]):Promise<HeadOutPut>{
        const response = await this._leadRepo.assignToEmploye(empId,selectedRows)
        if(response){
            return{
                status:200,
                message:'Leads assignment successfully completed',
                newLeads:response
            }
        }else{
            return{
                status:400,
                message:'Somthing went wrong, Please try again.'
            }
        }
    }
}

export default HeadUseCase

