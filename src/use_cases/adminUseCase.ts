import AdminRepository from "../infrastructure/repositories/adminRepository";
import IAdminUsecase from "../interfaces/IUseCases/IAdminUseCase";
import { AdminOutPut } from "../interfaces/models/adminOutPut";
import Jwt from "../providers/jwt";


class AdminUseCase implements IAdminUsecase {
  constructor(
    private readonly _adminRepo: AdminRepository,
    private readonly _jwt:Jwt
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
}

export default AdminUseCase