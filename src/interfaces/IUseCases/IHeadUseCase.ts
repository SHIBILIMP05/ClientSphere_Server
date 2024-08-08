import { HeadOutPut } from "../models/headOutPut";

interface IHeadUseCase{
    login(email:string,password:string):Promise<HeadOutPut>
}

export default IHeadUseCase