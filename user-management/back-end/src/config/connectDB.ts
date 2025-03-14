import mongoose from "mongoose";

 export async function connectDB(){

    try {
        const dbUrl:string |undefined = process.env.DB;
        if(!dbUrl){
            throw new Error('Connection String is missing')
        }
        await mongoose.connect(dbUrl);
        console.log('DB conected')
    } catch (error) {
        console.log(error)
    }
}