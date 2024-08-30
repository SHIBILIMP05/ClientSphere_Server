import { NextFunction, Request, Response } from "express";
import EmployeeRepository from "../infrastructure/repositories/employeeRepository";

const employeeRepo = new EmployeeRepository()

export const blockCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.empId
        const employe = await employeeRepo.findById(id)
        if (employe?.is_restricted) {
            res.status(401).json({employe:{ message: 'Your actions Restricted by admin.' }})
        } else {
            next()
        }
    } catch (error) {
        console.error(error);
    }
}