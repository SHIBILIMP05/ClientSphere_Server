import { Request, Response } from "express";
import EmployeeUseCase from "../use_cases/employeeUseCase";
import fileUpload from "express-fileupload";
import cloudinary from "../providers/cloudinary";
// import xlsx from 'xlsx';
import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { LeadData } from "../interfaces/models/leads";


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
            const page = parseInt(req.params.pageNo)
            console.log("page", page);

            const search = typeof req.query.search === 'string' ? req.query.search : undefined;
            const status = typeof req.query.status === 'string' ? req.query.status : undefined;
            const dateStr = typeof req.query.date === 'string' ? req.query.date : undefined;



            const response = await this._employeeUseCase.listMyLeads(empId, page, search, status, dateStr)
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

    async addLead(req: Request, res: Response) {
        try {
            const empId = req.params.empId
            const leadData = req.body.leadData
            console.log("empid", empId);
            const response = await this._employeeUseCase.addLead(empId, leadData)
            if (response) {
                return res.status(200).json({ response })
            } else {
                return res.status(400).json({ response })
            }
        } catch (error) {
            console.error(error);

        }
    }

    async excelUpload(req: Request, res: Response) {
        try {
            const UPLOAD_DIR = path.join('./src/', 'uploads');
            const empId = req.params.empId
            if (!req.files || !req.files.excelFile) {
                return res.status(400).send('No files were uploaded.');
            }

            const file = req.files.excelFile as fileUpload.UploadedFile;
            const filePath = path.join(UPLOAD_DIR, file.name);

            
            await file.mv(filePath);

           
            const workbook = XLSX.readFile(filePath);

            
            const sheetName = workbook.SheetNames[0];
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

           
            const leads = sheetData.map((lead: any) => ({
                name: lead['name'] || null,
                email: lead['email'] || null,
                phone: lead['phone'] || null,
                date: lead['date'] || null,
                company: lead['company'] || null,              
            }));

           
            fs.unlinkSync(filePath);

            const response = await this._employeeUseCase.excelUpload(leads,empId);
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