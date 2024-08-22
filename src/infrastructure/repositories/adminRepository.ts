import adminModel from "../../entities_models/adminModel";
import IAdminRepository from "../../interfaces/IRepositories/IAdminRepository";
import admin from "../../interfaces/models/admin";

class AdminRepository implements IAdminRepository {

    async findByEmail(email: string): Promise<admin | null> {
        try {
            const admin = await adminModel.findOne({ email: email })
            if (admin) {
                return admin
            } else {
                return null
            }
        } catch (error) {
            console.error(error);
            return null
        }
    }

    async updateData(editDatas: admin):Promise<admin | null> {
        try {
            const updateAdmin = await adminModel.findByIdAndUpdate(
                editDatas._id,
                {
                    name: editDatas.name,
                    email: editDatas.email,
                    address: editDatas.address,
                    city: editDatas.city,
                    country: editDatas.country,
                    pinCode: editDatas.pinCode,
                    phone: editDatas.phone,
                    image: editDatas.image,
                },
                { new: true }
            )
            console.log("updated admin-----",updateAdmin);
            
            if (updateAdmin) {
                return updateAdmin
            } else {
                return null
            }
        } catch (error) {
            console.error('Error updating admin data:', error);
            return null
        }


    }
}

export default AdminRepository