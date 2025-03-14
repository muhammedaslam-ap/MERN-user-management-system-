import { userModel } from "../model/userModel";
import { AdminLogin } from "../interface/adminIN";

export interface IUser{
   name:string,
   email:string
}

export class AdminRepository{
   async AdminAuth(data:AdminLogin){
    return await userModel.findOne({email:data.email,role:'admin'})
   }
   
   async getUser(){
      return await userModel.find({role:'user'});
   }

   async deleteUser(id:string){
      return await userModel.deleteOne({_id:id})
   }
   async updateUser(id:string,user:IUser){
      return await userModel.findOneAndUpdate(
        { _id: id }, 
        { $set: user }, 
        { new: true }
      );
   }
   async getUserById(id:string){
      return await userModel.findById({_id:id});
   }
}