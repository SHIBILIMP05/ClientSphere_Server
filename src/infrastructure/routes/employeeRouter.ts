import express, { Request, Response } from "express"
import { employeController } from "../../providers/controllers"
import { blockCheck } from "../../middlewares/employeeAuth"

const router =express.Router()

/* Employee rout handlers */
const handleEditProfile = (req:Request,res:Response)=>employeController.editProfile(req,res)
const handleListMyLeads = (req:Request,res:Response)=>employeController.listMyLeads(req,res)
const handleFetchLeadInfo = (req:Request,res:Response)=>employeController.fetchLeadInfo(req,res)
const handleUpdateLeadInfo = (req:Request,res:Response)=>employeController.updateLeadInfo(req,res)
const handleListHistory = (req:Request,res:Response)=>employeController.listHistory(req,res)
const handleAddLead = (req:Request,res:Response)=>employeController.addLead(req,res)

/* Rout for employee management */
router.post('/:empId/editProfile',blockCheck,handleEditProfile)

/* Rout for lead management */
router.get('/:empId/listMyLeads/:pageNo',blockCheck,handleListMyLeads)
router.get('/:empId/fetchLeadInfo/:leadId',blockCheck,handleFetchLeadInfo)
router.post('/:empId/updateLeadInfo/:leadId',blockCheck,handleUpdateLeadInfo)
router.post('/:empId/addLead',blockCheck,handleAddLead)

/* Rout for history management */
router.get('/:empId/listHistory',blockCheck,handleListHistory)


export default router