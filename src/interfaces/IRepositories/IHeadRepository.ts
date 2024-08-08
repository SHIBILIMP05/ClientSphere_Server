import Head from "../models/head";


interface IHeadRepository{
    findByEmail(email:string):Promise<Head|null>
}

export default IHeadRepository