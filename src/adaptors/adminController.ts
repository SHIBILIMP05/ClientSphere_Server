// import { Response, Request } from "express-serve-static-core";
import { Request, Response } from "express";
import AdminUseCase from "../use_cases/adminUseCase";



class AdminController {
    constructor(
        private readonly _adminUseCase: AdminUseCase
    ) {}

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            
            const admin = await this._adminUseCase.login(email, password)
            if (admin) {
                return res.status(200).json({ admin })
            } else {
                return res.status(400).json({ admin })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong' })
        }
    }

    async createEmployee(req:Request,res:Response){
        try {
            console.log(req.body);
            const {name,position,email} = req.body
            const employeeDetails = await this._adminUseCase.createEmployee(name,email,position)
            if(employeeDetails){
                return res.status(200).json({employeeDetails})
            }else{
                return res.status(400).json({employeeDetails})
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong !' })
        }
    }
}


export default AdminController