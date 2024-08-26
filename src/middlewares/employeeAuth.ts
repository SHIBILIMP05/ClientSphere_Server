import { NextFunction, Request, Response } from "express";
import EmployeeRepository from "../infrastructure/repositories/employeeRepository";

const employeeRepo = new EmployeeRepository()

export const blockCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.empId
        console.log("id''''''''''';;;;;", id);

        const employe = await employeeRepo.findById(id)
        console.log(employe);
        if (employe?.is_restricted) {
            res.json({ message: 'Your actions Restricted by admin.' }).status(401)
            // return{
            //     status:401,
            //     message:"action restricted",
            //   }
        } else {

            next()
        }
    } catch (error) {
        console.error(error);

    }
}