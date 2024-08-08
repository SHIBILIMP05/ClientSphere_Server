import bcrypt from 'bcrypt'

class ManagePassword{
    async hashPassword(plinePassword:string):Promise<string|undefined>{
        try {
            console.log("plinePassword:::",plinePassword);
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(plinePassword,saltRounds)
            if(hashedPassword){
                return hashedPassword
            }else{
                throw new Error('Error occure while hashing password.')
                
            }
            
        } catch (error) {
            console.error(error);
            
        }
    }

    async verifyPassword(plinePassword:string,hashedPassword:string):Promise<boolean|undefined>{
        try {
            const match = await bcrypt.compare(plinePassword,hashedPassword)
            return match
        } catch (error) {
            console.error(error);
            
        }
    }
}

export default ManagePassword