import AdminRepository from "../infrastructure/repositories/adminRepository";
import EmployeeRepository from "../infrastructure/repositories/employeeRepository";
import IAdminUsecase from "../interfaces/IUseCases/IAdminUseCase";
import { AdminOutPut } from "../interfaces/models/adminOutPut";
import GenerateCredential from "../providers/generateCredential";
import Jwt from "../providers/jwt";


class AdminUseCase implements IAdminUsecase {
  constructor(
    private readonly _adminRepo: AdminRepository,
    private readonly _employeeRepo: EmployeeRepository,
    private readonly _jwt: Jwt,
    private readonly _generateCredential: GenerateCredential,


  ) { }

  async login(email: string, password: string): Promise<AdminOutPut> {
    const admin = await this._adminRepo.findByEmail(email)
    if (admin) {
      if (admin.password != password) {
        return {
          status: 400,
          message: 'Invalid Credential'
        }
      }
      const accessToken = this._jwt.createAccessToken(admin._id, 'admin')

      return {
        status: 200,
        message: 'Login Successfully',
        accessToken: accessToken
      }
    } else {
      return {
        status: 400,
        message: 'Data Not Found'
      }
    }
  }

  async createEmployee(name: string, email: string, position: string): Promise<AdminOutPut> {
    const employe = await this._employeeRepo.findByEmail(email)
    if (employe) {
      return {
        status: 409,
        message: 'Employe allready exist'
      }
    } else {
      const employeId = this._generateCredential.generateCreateId()
      const password = this._generateCredential.generatePassword()
      console.log("password",password);
      
      const employeeData = {
        name: name,
        position: position,
        email: email,
        ID: (await employeId).toString(),
        password: (await password).toString()
      }


      const addEmploye = await this._employeeRepo.createEmploye(employeeData);

      if (addEmploye) {
        return {
          status: 200,
          message: 'Employe successfully created',
          employeId:addEmploye.ID,
          employePassword:addEmploye.password
        }
      } else {
        return {
          status: 400,
          message: 'Somthing went wrong !, try agian.'
        }
      }


    }
  }

  async listEmploye(){
    const employeList = await this._employeeRepo.findAll()
    if(employeList){
      return {
        status:200,
        message:"success",
        employeList:employeList
      }
    }else{
      return {
        status: 400,
        message: 'Data Not Found'
      }
    }
  }

}

export default AdminUseCase