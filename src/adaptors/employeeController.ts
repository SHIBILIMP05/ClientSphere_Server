import { Request, Response } from "express";
import EmployeeUseCase from "../use_cases/employeeUseCase";
import fileUpload from "express-fileupload";
import cloudinary from "../providers/cloudinary";


class EmployeController {
    constructor(
        private readonly _employeeUseCase: EmployeeUseCase
    ) { }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const employe = await this._employeeUseCase.login(email, password)
            console.log("control data ===", employe);

            switch (employe.status) {

                case 200:
                    return res.status(200).json({ employe })
                case 400:
                    return res.status(400).json({ employe })
                case 401:
                    return res.status(401).json({ employe })
                default:
                    return

            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong' })

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
                return res.status(400).json({ editProfileResponse })
            }
        } catch (error) {
            console.error(error);

        }
    }

    async listMyLeads(req: Request, res: Response) {
        try {
            const empId = req.params.empId
            console.log("emId", empId);

            const response = await this._employeeUseCase.listMyLeads(empId)
            if (response) {
                return res.status(200).json({ response })
            } else {
                return res.status(400).json({ response })
            }
        } catch (error) {
            console.error(error);

        }
    }

    async fetchLeadInfo(req: Request, res: Response) {
        try {
            const leadId = req.params.leadId
            console.log("leadId", leadId);

            const response = await this._employeeUseCase.fetchLeadInfo(leadId)
            if (response) {
                return res.status(200).json({ response })
            } else {
                return res.status(400).json({ response })
            }
        } catch (error) {
            console.error(error);

        }
    }

    async updateLeadInfo(req: Request, res: Response) {
        try {
            const empId = req.params.empId
            const leadId = req.params.leadId
            const leadData = req.body.leadData
            console.log("datass", leadId, leadData);
            const response = await this._employeeUseCase.updateLeadInfo(leadData, leadId, empId)
            if (response) {
                return res.status(200).json({ response })
            } else {
                return res.status(400).json({ response })
            }

        } catch (error) {
            console.error(error);

        }
    }

    async listHistory(req: Request, res: Response) {
        try {
            const empId = req.params.empId
            console.log("emp", empId);
            const response = await this._employeeUseCase.listHistory(empId)
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

export default EmployeController