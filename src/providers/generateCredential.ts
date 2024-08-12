import {v4 as uuidv4} from 'uuid'
import generator from 'generate-password';

class GenerateCredential{
    async generateCreateId(){
        return `EMP-${uuidv4()}` ;
    }

    async generatePassword(){
        const password = generator.generate({
            length:17,
            numbers:true,
        })
        return password;
    }
}


export default GenerateCredential