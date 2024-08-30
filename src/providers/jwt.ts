import { sign } from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()
class Jwt {
    private secratKey: string

    constructor() {

        this.secratKey = process.env.JWTSecreat || ""
    }

    createAccessToken(id: string, role: string): string | undefined {
        try {
            console.log("role:", role, id);
            
            if (!this.secratKey) {
                throw new Error("Secret key is undefined");
            }

            const payLoad = { id, role }
            const token = sign(payLoad, this.secratKey, { expiresIn: '24h' })
            return token

        } catch (error) {
            console.log(error);
        }
    }
}


export default Jwt;