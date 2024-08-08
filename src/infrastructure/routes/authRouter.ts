import express, { Request, Response } from 'express'


import { adminController, headController } from '../../providers/controllers'


const router = express.Router()

/* Admin Auth Rout Handlers  */
const handleAdminLogin = (req:Request,res:Response)=>adminController.login(req,res)

/* Head Auth Rout Handlers  */
const handleHeadLogin = (req:Request,res:Response)=>headController.login(req,res)

/* Admin auth routes */
router.post('/admin/login',handleAdminLogin)

/* Head auth routes */
router.post('/head/login',handleHeadLogin)


export default router