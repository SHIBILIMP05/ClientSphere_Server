import HeadRepository from "../infrastructure/repositories/headRepository";
import IHeadUseCase from "../interfaces/IUseCases/IHeadUseCase";
import { HeadOutPut } from "../interfaces/models/headOutPut";
import Jwt from "../providers/jwt";
import ManagePassword from "../providers/managePassword";

class HeadUseCase implements IHeadUseCase{
    constructor(
        private readonly _headRepo:HeadRepository,
        private readonly _jwt:Jwt,
        private readonly _managePassword:ManagePassword
    ){}

    async login(email: string, password: string): Promise<HeadOutPut> {
        const head = await this._headRepo.findByEmail(email)
        if(head){
            const match = await this._managePassword.verifyPassword(password,head.password)
            console.log('match === ',match);
            
            if(!match){
                return{
                    status:400,
                    message:"Invalid Credential"
                }
            }
            const accessToken = this._jwt.createAccessToken(head._id,'head')
            return {
                status:200,
                message:"Login Successfully",
                accessToken:accessToken
            }
        }else{
            return{
                status:400,
                message:"Data not found."
            }
        }
    }
}

export default HeadUseCase