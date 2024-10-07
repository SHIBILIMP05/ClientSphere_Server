import EmployeeRepository from "../infrastructure/repositories/employeeRepository";
import HistoryRepository from "../infrastructure/repositories/historyRepository";
import LeadsRepository from "../infrastructure/repositories/leadsRepository";
import IEmployeeUseCase from "../interfaces/IUseCases/IEmployeeUseCase";
import Employee from "../interfaces/models/employee";
import { EmployeeOutPut } from "../interfaces/models/employeeOutPut.ts";
import { LeadData } from "../interfaces/models/leads";
import Jwt from "../providers/jwt";
import ManagePassword from "../providers/managePassword";


class EmployeeUseCase implements IEmployeeUseCase {
  constructor(
    private readonly _employeeRepo: EmployeeRepository,
    private readonly _leadRepo: LeadsRepository,
    private readonly _historyRepo: HistoryRepository,
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

  async listMyLeads(empId: string,page:number,search?:string,status?:string,date?:string): Promise<EmployeeOutPut> {
    const response = await this._leadRepo.listLeads_WithEmpId(empId,page,search,status,date)
    if (response) {
      return {
        status: 200,
        message: 'Data Successfully listed',
        leadsList: response.leadsList,
        count:response.count
      }
    } else {
      return {
        status: 400,
        message: 'Data Not Found'
      }
    }
  }

  async fetchLeadInfo(leadId: string): Promise<EmployeeOutPut> {
    const response = await this._leadRepo.fetchLeadInfo(leadId)
    if (response) {
      return {
        status: 200,
        message: 'Data Successfully listed',
        leadInfo: response
      }
    } else {
      return {
        status: 400,
        message: 'Data Not Found'
      }
    }
  }

  async updateLeadInfo(leadData: LeadData, leadId: string, empId: string): Promise<EmployeeOutPut> {
    const response = await this._leadRepo.updateLeadInfo(leadId, leadData)
    if (response) {
      console.log("response", response);
      const message = 'Lead info Updated'
      const storeHistory = await this._historyRepo.addHistory(response, empId, leadId, message)
      if (storeHistory) {

        return {
          status: 200,
          message: 'Data Successfully Updated',
          leadInfo: response
        }
      } else {
        return {
          status: 400,
          message: 'Somthing went wrong Histrory is not traked'
        }
      }
    } else {
      return {
        status: 400,
        message: 'Somthing went wrong pleas try again'
      }
    }
  }

  async listHistory(empId: string): Promise<EmployeeOutPut> {
    const response = await this._historyRepo.listHistory(empId)
    if (response) {
      return {
        status: 200,
        message: 'History founded Successfully',
        historyList: response
      }
    } else {
      return {
        status: 400,
        message: 'Data not found'
      }
    }
  }

  async addLead(empId:string,leadData:LeadData):Promise<EmployeeOutPut>{
    const response = await this._leadRepo.addLeadByEmployee(empId,leadData)
    if (response) {
      return {
        status: 200,
        message: 'Lead profile created Successfully',
      }
    } else {
      return {
        status: 400,
        message: 'Somthing went wrong, pleas try again.'
      }
    }
  }

}

export default EmployeeUseCase