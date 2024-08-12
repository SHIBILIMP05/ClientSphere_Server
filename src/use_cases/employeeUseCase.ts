import EmployeeRepository from "../infrastructure/repositories/employeeRepository";
import IEmployeeUseCase from "../interfaces/IUseCases/IEmployeeUseCase";
import { EmployeeOutPut } from "../interfaces/models/employeeOutPut.ts";
import Jwt from "../providers/jwt";


class EmployeeUseCase implements IEmployeeUseCase {
    constructor(
        private readonly _employeeRepo: EmployeeRepository,
        private readonly _jwt: Jwt,
    ) { }

    async login(email: string, password: string): Promise<EmployeeOutPut> {
        const employe = await this._employeeRepo.findByEmail(email)
        if (employe) {
            if (employe.password != password) {
                return {
                    status: 400,
                    message: 'Invalid Credential'
                }
            }
            const accessToken = this._jwt.createAccessToken(employe._id as string, 'employee')
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
}

export default EmployeeUseCase