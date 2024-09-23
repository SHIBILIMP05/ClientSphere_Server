import EmployeeRepository from "../infrastructure/repositories/employeeRepository";
import LeadsRepository from "../infrastructure/repositories/leadsRepository";
import IEmployeeUseCase from "../interfaces/IUseCases/IEmployeeUseCase";
import Employee from "../interfaces/models/employee";
import { EmployeeOutPut } from "../interfaces/models/employeeOutPut.ts";
import Jwt from "../providers/jwt";
import ManagePassword from "../providers/managePassword";


class EmployeeUseCase implements IEmployeeUseCase {
  constructor(
    private readonly _employeeRepo: EmployeeRepository,
    private readonly _leadRepo: LeadsRepository,
    private readonly _jwt: Jwt,
    private readonly _managePassword: ManagePassword
  ) { }

  async login(email: string, password: string): Promise<EmployeeOutPut> {
    const employe = await this._employeeRepo.findByEmail(email)

    if (employe) {
      if (employe.is_restricted) {
        return {
          status: 401,
          message: 'Your action restricted by admin'
        }
      } else {
        const match = await this._managePassword.verifyPassword(password, employe.password as string)
        if (!match) {
          return {
            status: 400,
            message: 'Invalid Credential'
          }
        }
        const accessToken = this._jwt.createAccessToken(employe._id as string, 'employee')
        return {
          status: 200,
          message: 'Login Successfully',
          accessToken: accessToken,
          data: employe
        }

      }
    } else {
      return {
        status: 400,
        message: 'Data Not Found'
      }
    }
  }


  async editProfile(editDatas: Employee) {
    const editProfileResponse = await this._employeeRepo.updateData(editDatas)
    if (editProfileResponse) {
      return {
        status: 200,
        message: "Profile succesfully updated",
        data: editProfileResponse
      }
    } else {
      return {
        status: 400,
        message: 'Data Not Found'
      }
    }

  }

  async listMyLeads(empId:string):Promise<EmployeeOutPut>{
    const response = await this._leadRepo.listLeads_WithEmpId(empId)
    if(response){
      return{
        status:200,
        message:'Data Successfully listed',
        leadsList:response
      }
    }else{
      return {
        status: 400,
        message: 'Data Not Found'
      } 
    }
  }

  async fetchLeadInfo(leadId:string):Promise<EmployeeOutPut>{
    const response = await this._leadRepo.fetchLeadInfo(leadId)
    if(response){
      return{
        status:200,
        message:'Data Successfully listed',
        leadInfo:response
      }
    }else{
      return {
        status: 400,
        message: 'Data Not Found'
      } 
    }
  }
}

export default EmployeeUseCase