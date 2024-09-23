import express, { Request, Response } from "express"
import { employeController } from "../../providers/controllers"
import { blockCheck } from "../../middlewares/employeeAuth"

const router =express.Router()

/* Employee rout handlers */
const handleEditProfile = (req:Request,res:Response)=>employeController.editProfile(req,res)
const handleListMyLeads = (req:Request,res:Response)=>employeController.listMyLeads(req,res)
const handleFetchLeadInfo = (req:Request,res:Response)=>employeController.fetchLeadInfo(req,res)
/* Rout for employee management */
router.post('/:empId/editProfile',blockCheck,handleEditProfile)

/* Rout for lead management */
router.get('/:empId/listMyLeads',blockCheck,handleListMyLeads)
router.get('/:empId/fetchLeadInfo/:leadId',blockCheck,handleFetchLeadInfo)

export default router