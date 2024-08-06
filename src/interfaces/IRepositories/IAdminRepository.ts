import admin from "../models/admin";

interface IAdminRepository {
    findByEmail(email:string):Promise<admin | null>,


}

export default IAdminRepository