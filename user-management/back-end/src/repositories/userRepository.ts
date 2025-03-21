import { userModel } from "../model/userModel";
import { UserLogin,UserRegister,IupdateUser } from "../interface/userIN";

export class userRepository{
    async createUser(data:UserRegister){
        await userModel.create(data)
    }
    async findByEmail(email: string) {
        console.log()
       return await userModel.findOne({ email });
      }

    async findByName(name: string){
        return await userModel.findOne({ name });
    }

    async UserAuth(data:UserLogin) {
       return await userModel.findOne({email:data.email});
    }

    async updateUser(data:IupdateUser){
        return await userModel.findOneAndUpdate(
            { email: data.email },
            { $set: { name: data.name, profileImage: data.profileImage } },   
            {new:true}   
          )
    }

    async getUser(userId:string){
        return await userModel.findById({_id:userId})
    }

}
