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
}

export default AdminRepository