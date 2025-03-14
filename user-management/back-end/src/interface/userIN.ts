export interface UserRegister {
    name: string;
    email: string;
    password: string;
    profileImage?:string
  }
 
 export interface UserLogin{
   email:string;
   password:string;
 }
 
 export interface IupdateUser {
   email: string;
   name: string;
   profileImage?: string;
 }