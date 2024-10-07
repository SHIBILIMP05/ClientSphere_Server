// import { Response, Request } from "express-serve-static-core";
import { Request, Response } from "express";
import AdminUseCase from "../use_cases/adminUseCase";
import fileUpload from "express-fileupload";
import cloudinary from "../providers/cloudinary";



class AdminController {
    constructor(
        private readonly _adminUseCase: AdminUseCase,
    ) { }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const admin = await this._adminUseCase.login(email, password)
            if (admin) {
                return res.status(200).json({ admin })
            } else {
                return res.status(400).json({ admin })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong' })
        }
    }
    async blockEmployee(req: Request, res: Response) {
        try {
            const id = req.params.empId
            console.log("IDDDDD", id);
            const restriction = await this._adminUseCase.blockEmployee(id)
            if (restriction) {
                return res.status(200).json({ restriction })
            } else {
                return res.status(400).json({ restriction })
            }
        } catch (error) {
            console.error(error);

        }
    }

    async createEmployee(req: Request, res: Response) {
        try {
            const { name, position, email } = req.body
            const employeeDetails = await this._adminUseCase.createEmployee(name, email, position)
            if (employeeDetails) {
                return res.status(200).json({ employeeDetails })
            } else {
                return res.status(400).json({ employeeDetails })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong !' })
        }
    }

    async listEmploye(req: Request, res: Response) {
        try {
            const page: number = parseInt(req.params.pageNo)
            const employeList = await this._adminUseCase.listEmploye(page)
            if (employeList) {
                return res.status(200).json({ employeList })
            } else {
                return res.status(200).json({ employeList })
            }
        } catch (error) {
            console.error(error);

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
            const editProfileResponse = await this._adminUseCase.editProfile(editDatas)
            if (editProfileResponse) {
                return res.status(200).json({ editProfileResponse })
            } else {
                return res.status(200).json({ editProfileResponse })
            }
        } catch (error) {
            console.error(error);

        }
    }

    async submitLeadsForm(req: Request, res: Response) {
        try {
            const leadData = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                company: req.body.company,
                leadSource: req.body.leadSource,
                message: req.body.message,
            }
            const response = await this._adminUseCase.submitLeadsForm(leadData)
            if(response){
                return res.status(200).json({ response })
            }else{
                return res.status(400).json({response})
            }

        } catch (error) {
            console.error(error);

        }
    }
}


export default AdminController