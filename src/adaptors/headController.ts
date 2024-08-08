import { Request, Response } from "express";
import HeadUseCase from "../use_cases/headUseCase";



class HeadController{
    constructor(
        private readonly _headUseCase:HeadUseCase
    ){}

    async login(req:Request,res:Response){
        try {
            const {email,password} = req.body
            const head = await this._headUseCase.login(email,password)
            if(head){
                return res.status(200).json({head})
            }else{
                return res.status(400).json({head})
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({message:'Somthing went wrong'})
            
        }
    }
}

export default HeadController;