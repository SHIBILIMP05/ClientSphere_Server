import { Request, Response } from "express";
import EmployeeUseCase from "../use_cases/employeeUseCase";
import fileUpload from "express-fileupload";
import cloudinary from "../providers/cloudinary";


class EmployeController{
    constructor(
        private readonly _employeeUseCase:EmployeeUseCase
    ){}
    
    async login(req:Request,res:Response){
        try {
            const {email,password} = req.body
            const employe = await this._employeeUseCase.login(email,password)
            if(employe){
                return res.status(200).json({employe})
            }else{
                return res.status(400).json({employe})
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({message:'Something went wrong'})
            
        }
    }

    async editProfile(req: Request, res: Response) {
        try {
            const { _id, name, email, address, city, country, pinCode, phone } = req.body

            if (!req.files || !req.files.image) {
                return res.status(400).json({ message: 'No image file uploaded' });
            }

            const image = req.files.image as fileUpload.UploadedFile;

            const result = await cloudinary.uploader.upload(image.tempFilePath, {
                folder: 'profile_images',
            });

            const editDatas = {
                _id: _id,
                name: name,
                email: email,
                address: address,
                city: city,
                country: country,
                pinCode: pinCode,
                phone: phone,
                image: result.secure_url
            }
            console.log("editDatas", editDatas);
            const editProfileResponse = await this._employeeUseCase.editProfile(editDatas)
            if (editProfileResponse) {
                return res.status(200).json({ editProfileResponse })
            } else {
                return res.status(200).json({ editProfileResponse })
            }
        } catch (error) {
            console.error(error);

        }
    }

}

export default EmployeController