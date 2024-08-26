import express, { Request, Response } from "express"
import { employeController } from "../../providers/controllers"
import { blockCheck } from "../../middlewares/employeeAuth"

const router =express.Router()

/* Admin rout handlers */

const handleEditProfile = (req:Request,res:Response)=>employeController.editProfile(req,res)

/* Rout for employe creation */

router.post('/:empId/editProfile',blockCheck,handleEditProfile)

export default router