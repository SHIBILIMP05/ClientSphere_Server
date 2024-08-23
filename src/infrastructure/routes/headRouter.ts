import express, { Request, Response } from "express"
import { headController } from "../../providers/controllers"

const router =express.Router()

/* Admin rout handlers */

const handleEditProfile = (req:Request,res:Response)=>headController.editProfile(req,res)

/* Rout for employe creation */

router.post('/editProfile',handleEditProfile)

export default router