import express, { Request, Response } from 'express'


import { adminController } from '../../providers/controllers'


const router = express.Router()

/* Admin Auth Rout Handlers  */
const handleAdminLogin = (req:Request,res:Response)=>adminController.login(req,res)



router.post('/login',handleAdminLogin)

export default router