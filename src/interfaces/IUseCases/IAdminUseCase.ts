import { AdminOutPut } from "../models/adminOutPut";

interface IAdminUsecase {
    login(email: string, password: string): Promise<AdminOutPut>,
}

export default IAdminUsecase