import { Request, Response } from "express";
import EmployeeUseCase from "../use_cases/employeeUseCase";


class EmployeController{
    constructor(
        private readonly _employeeUseCase:EmployeeUseCase
    ){}
    
    async login(req:Request,res:Response){
        try {
            const {email,password} = req.body
            const employe = await this._employeeUseCase.login(email,password)
            if(employe){
                return res.status(200).json({employe})
            }else{
                return res.status(400).json({employe})
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({message:'Something went wrong'})
            
        }
    }

}

export default EmployeController