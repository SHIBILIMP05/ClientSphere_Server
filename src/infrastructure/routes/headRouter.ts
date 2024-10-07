import express, { Request, Response } from "express"
import { headController } from "../../providers/controllers"

const router =express.Router()

/* Head rout handlers */
const handleEditProfile = (req:Request,res:Response)=>headController.editProfile(req,res)
const handleListNewLeads = (req:Request,res:Response)=>headController.listNewLeads(req,res)
const handleEmployeeList = (req:Request,res:Response)=>headController.listEmployee(req,res)
const handleAssignLeads = (req:Request,res:Response)=>headController.assignLeads(req,res)
/* Rout for head management */
router.post('/editProfile',handleEditProfile)

/* Rout for employe management */
router.get('/listEmployee',handleEmployeeList)

/* Rout for leads management */
router.get('/listNewLeads/:pageNo',handleListNewLeads)
router.post('/assignLeads/:empId',handleAssignLeads)

export default router