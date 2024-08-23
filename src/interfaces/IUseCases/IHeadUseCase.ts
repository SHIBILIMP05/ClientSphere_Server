import Head from "../models/head";
import { HeadOutPut } from "../models/headOutPut";

interface IHeadUseCase{
    login(email:string,password:string):Promise<HeadOutPut>
    editProfile(editDatas:Head):Promise<HeadOutPut>
}

export default IHeadUseCase