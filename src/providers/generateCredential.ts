import {v4 as uuidv4} from 'uuid'
import crypto from 'crypto'

class GenerateCredential{
    async generateCreateId(){
        return `EMP-${uuidv4()}` ;
    }

    async generatePassword(){
        const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).toUpperCase().slice(-4);
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')
        return hashedPassword;
    }
}


export default GenerateCredential