import express, { Request, Response } from 'express'


import { adminController, employeController, headController } from '../../providers/controllers'


const router = express.Router()

/* Admin Auth Rout Handlers  */
const handleAdminLogin = (req:Request,res:Response)=>adminController.login(req,res)

/* Head Auth Rout Handlers  */
const handleHeadLogin = (req:Request,res:Response)=>headController.login(req,res)

/* Employe Auth Rout Handlers */
const handleEmployeLogin = (req:Request,res:Response)=>employeController.login(req,res)
const handleEmployeBlock = (req:Request,res:Response)=>adminController.blockEmployee(req,res)

/* Admin auth routes */
router.post('/admin/login',handleAdminLogin)

/* Head auth routes */
router.post('/head/login',handleHeadLogin)

/* Employee auth routes */
router.post('/employe/login',handleEmployeLogin)
router.get('/employe/:empId/block',handleEmployeBlock)

export default router