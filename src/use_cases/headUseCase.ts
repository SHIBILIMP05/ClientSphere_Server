import HeadRepository from "../infrastructure/repositories/headRepository";
import IHeadUseCase from "../interfaces/IUseCases/IHeadUseCase";
import Head from "../interfaces/models/head";
import { HeadOutPut } from "../interfaces/models/headOutPut";
import Jwt from "../providers/jwt";
import ManagePassword from "../providers/managePassword";

class HeadUseCase implements IHeadUseCase {
    constructor(
        private readonly _headRepo: HeadRepository,
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
}

export default HeadUseCase

