import AdminRepository from "../infrastructure/repositories/adminRepository";
import EmployeeRepository from "../infrastructure/repositories/employeeRepository";
import IAdminUsecase from "../interfaces/IUseCases/IAdminUseCase";
import { AdminOutPut } from "../interfaces/models/adminOutPut";
import GenerateCredential from "../providers/generateCredential";
import Jwt from "../providers/jwt";


class AdminUseCase implements IAdminUsecase {
  constructor(
    private readonly _adminRepo: AdminRepository,
    private readonly _employeeRepo:EmployeeRepository,
    private readonly _jwt:Jwt,
    private readonly _generateCredential:GenerateCredential
    
  ) {}

  async login(email: string, password: string):Promise <AdminOutPut> {
    const admin = await this._adminRepo.findByEmail(email)
    if (admin) {
      if (admin.password != password) {
        return {
          status: 400,
          message: 'Invalid Credential'
        }
      }
      const accessToken = this._jwt.createAccessToken(admin._id,'admin')

      return {
        status: 200,
        message: 'Login Successfully',
        accessToken:accessToken
      }
    } else {
      return {
        status: 400,
        message: 'Data Not Found'
      }
    }
  }

  async createEmployee(name: string,position: string,email: string):Promise<AdminOutPut>{
    const employe = await this._employeeRepo.findByEmail(email)
    if(employe){
      return{
        status:409,
        message:'Employe allready exist'
      }
    }else{
      const employeId = this._generateCredential.generateCreateId()
      const password = this._generateCredential.generatePassword()
      console.log({name,position});
      
      console.log("credential ===>",{employeId,password});
      return {
        status:200,
        message:'Employee successfully created'
      }
    }
  }

}

export default AdminUseCase