import mongoose from "mongoose"

export const ConnectDB = async () => {
    try {
        console.log(process.env.MONGO_URL );
        
        await mongoose.connect(process.env.MONGO_URL as string)
            .then(() => console.log("DB Is Connected Successfully"))
            .catch(() => console.log("DB Connection Failed"))

    } catch (error) {
        console.error(error);
    }

}