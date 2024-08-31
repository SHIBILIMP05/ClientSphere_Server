import AdminRepository from "../infrastructure/repositories/adminRepository";
import EmployeeRepository from "../infrastructure/repositories/employeeRepository";
import HeadRepository from "../infrastructure/repositories/headRepository";
import IAdminUsecase from "../interfaces/IUseCases/IAdminUseCase";
import Admin from "../interfaces/models/admin";
import { AdminOutPut } from "../interfaces/models/adminOutPut";
import GenerateCredential from "../providers/generateCredential";
import Jwt from "../providers/jwt";
import ManagePassword from "../providers/managePassword";
import SendMail from "../providers/nodeMailer";


class AdminUseCase implements IAdminUsecase {
  constructor(
    private readonly _adminRepo: AdminRepository,
    private readonly _employeeRepo: EmployeeRepository,
    private readonly _headRepo: HeadRepository,
    private readonly _jwt: Jwt,
    private readonly _generateCredential: GenerateCredential,
    private readonly _managePassword: ManagePassword,
    private readonly _sendEmail: SendMail


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
        accessToken: accessToken,
        data: admin
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
      // const employeId =await this._generateCredential.generateCreateId()
      const password = await this._generateCredential.generatePassword()
      console.log("password", password);
      const plainePassword = password

      const hashedPassword = await this._managePassword.hashPassword(plainePassword)
      console.log("hasedPassword", hashedPassword);
      if (position === 'Employee') {

        const employeeData = {
          name: name,
          position: position,
          email: email,
          password: hashedPassword
        }

        const addEmploye = await this._employeeRepo.createEmploye(employeeData);

        if (addEmploye && addEmploye.email) {

          await this._sendEmail.sendCredentialMail(addEmploye.email, plainePassword, addEmploye.name)

          return {
            status: 200,
            message: 'Employe successfully created',
            employeId: addEmploye.email,
            employePassword: plainePassword
          }
        } else {
          return {
            status: 400,
            message: 'Somthing went wrong !, try agian.'
          }
        }
      } else {
        const headData = {
          name: name,
          position: position,
          email: email,
          password: hashedPassword
        }
        const addHead = await this._headRepo.createHead(headData);

        if (addHead) {
          return {
            status: 200,
            message: 'Head successfully created',
            employeId: addHead.email,
            employePassword: plainePassword
          }
        } else {
          return {
            status: 400,
            message: 'Somthing went wrong !, try agian.'
          }
        }
      }
    }
  }

  async listEmploye(page: number): Promise<AdminOutPut> {
    console.log("usecasePage==", page);

    const employeList = await this._employeeRepo.listEmploye(page)
    console.log("count---",employeList?.count);
    
    if (employeList) {
      return {
        status: 200,
        message: "success",
        employeList: employeList.employeList,
        count:employeList.count
      }
    } else {
      return {
        status: 400,
        message: 'Data Not Found'
      }
    }
  }

  async editProfile(editDatas: Admin) {
    const editProfileResponse = await this._adminRepo.updateData(editDatas)
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

  async blockEmployee(id: string): Promise<AdminOutPut> {
    const employe = await this._employeeRepo.findById(id)
    if (employe?.is_restricted) {
      const restriction = await this._employeeRepo.restrictAction(id, false)
      if (restriction) {
        console.log("unblock user");

        return {
          status: 200,
          message: "Action successfully allowed",
          is_restricted: restriction.is_restricted
        }
      } else {
        return {
          status: 400,
          message: 'Data Not Found'
        }
      }
    } else {
      const restriction = await this._employeeRepo.restrictAction(id, true)
      console.log("block user");

      if (restriction) {
        return {
          status: 200,
          message: "Action successfully Restricted",
          is_restricted: restriction.is_restricted
        }
      } else {
        return {
          status: 400,
          message: 'Data Not Found'
        }
      }
    }
  }

}

export default AdminUseCase