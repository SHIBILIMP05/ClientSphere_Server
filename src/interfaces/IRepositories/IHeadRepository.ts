import Head from "../models/head";


interface IHeadRepository {
    findByEmail(email: string): Promise<Head | null>,
    createHead(headData: Head): Promise<Head | null>,
    updateData(editDatas: Head): Promise<Head | null>

}

export default IHeadRepository