import AdminRepository from "../infrastructure/repositories/adminRepository";
import IAdminUsecase from "../interfaces/IUseCases/IAdminUseCase";
import { AdminOutPut } from "../interfaces/models/adminOutPut";


class AdminUseCase implements IAdminUsecase {
  constructor(
    private readonly _adminRepo: AdminRepository
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
      return {
        status: 200,
        message: 'Login Successfully'
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