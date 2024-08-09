import express, { Request, Response } from "express"
import { adminController } from "../../providers/controllers"

const router =express.Router()

/* Admin rout handlers */

const handleEmployeeCreation = (req:Request,res:Response)=>adminController.createEmployee(req,res)


/* Rout for employe creation */
router.post('/createEmployee',handleEmployeeCreation)

export default router