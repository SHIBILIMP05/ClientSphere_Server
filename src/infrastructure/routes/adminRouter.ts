import express, { Request, Response } from "express"
import { adminController } from "../../providers/controllers"

const router =express.Router()

/* Admin rout handlers */
const handleEmployeeCreation = (req:Request,res:Response)=>adminController.createEmployee(req,res)
const handleListEmployee = (req:Request,res:Response)=>adminController.listEmploye(req,res)
const handleEditProfile = (req:Request,res:Response)=>adminController.editProfile(req,res)
const handleadsAddingForm = (req:Request,res:Response)=>adminController.submitLeadsForm(req,res)

/* Routs for employe managemet */
router.post('/createEmployee',handleEmployeeCreation)
router.get('/listEmployee/:pageNo',handleListEmployee)

/* Routs for admin management */
router.post('/editProfile',handleEditProfile)

/* Routs for leads management */
router.post('/addLeadsData',handleadsAddingForm)


export default router