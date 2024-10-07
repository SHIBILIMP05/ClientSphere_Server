import { Request, Response } from "express";
import HeadUseCase from "../use_cases/headUseCase";
import fileUpload from "express-fileupload";
import cloudinary from "../providers/cloudinary";



class HeadController {
    constructor(
        private readonly _headUseCase: HeadUseCase
    ) { }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const head = await this._headUseCase.login(email, password)
            if (head) {
                return res.status(200).json({ head })
            } else {
                return res.status(400).json({ head })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Somthing went wrong' })

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
            const editProfileResponse = await this._headUseCase.editProfile(editDatas)
            if (editProfileResponse) {
                return res.status(200).json({ editProfileResponse })
            } else {
                return res.status(200).json({ editProfileResponse })
            }
        } catch (error) {
            console.error(error);

        }
    }

    async listNewLeads(req: Request, res: Response) {
        try {
            const page: number = parseInt(req.params.pageNo)
            const response = await this._headUseCase.listNewLeads(page)
            if (response) {
                return res.status(200).json({ response })

            } else {
                return res.status(400).json({ response })
            }
        } catch (error) {

        }
    }

    async listEmployee(req: Request, res: Response) {
        try {
            const response = await this._headUseCase.listEmployee()
            if (response) {
                return res.status(200).json({ response })
            } else {
                return res.status(400).json({ response })
            }
        } catch (error) {
            console.error(error);
        }
    }

    async assignLeads(req: Request, res: Response) {
        try {
            const selectedRows = req.body.selectedRows            
            const empId = req.params.empId            
            const response = await this._headUseCase.assignLeads(empId,selectedRows)
            if (response) {
                return res.status(200).json({ response })
            } else {
                return res.status(400).json({ response })
            }
        } catch (error) {
            console.error(error);

        }
    }
}

export default HeadController;