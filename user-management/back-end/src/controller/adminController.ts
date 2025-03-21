import { Request, Response } from "express";
import { adminService } from "../services/adminService";
import { AdminLogin } from "../interface/adminIN";
import jwt from 'jsonwebtoken'

export class AdminController{
    private adminServices : adminService
    constructor(){
        this.adminServices = new adminService()
    }

    async authAdmin(req: Request, res: Response){
        try{
            const data = req.body as AdminLogin
            console.log(data)
            const admin =await this.adminServices.AuthAdmin(data)
            const SECRET = process.env.SECRET;
            if (!SECRET) {
              throw new Error("The SECRET key is missing");
            }
            const token = jwt.sign({ _id: admin._id, email: admin.email }, SECRET, {
                expiresIn: "1d",
            });
    
            res.status(200).json({
                success: true,
                message: "Admin logged in succesfully",
                adminAccessToken: token,
                admin,
            });
        }catch(error:any){
            console.log("Error in login Admin", error);

            if (error.message.includes("Email Doesnot match") || error.message.includes("The password doesnot match")) {
                res.status(401).json({
                    success: false,
                    message: error.message, 
                });
                return
            }
    
            res.status(500).json({
              success: false,
              message: "Internal Server Error, Please try again later",
            });
        }
   
    }

    async getUsers(req: Request, res: Response) {
        try {
          const usersList = await this.adminServices.getUsers();
          res.status(200).json({
            success: true,
            message: "Get all users data",
            usersList: usersList,
          });
        } catch (error) {
          console.log("Error in getting user list", error);
          res.status(500).json({
            success: false,
            message: "Internal Server Error, Please try again later",
          });
        }
      }

      async updateUser(req:Request,res:Response,id:string){
        try {
            const user = req.body;
            const updateUser = await this.adminServices.updateUser(id,user)
            res.status(200).json({
                success: true,
                message: "User updated Succesfully",
                updatedUser: updateUser,
              });
        } catch (error) {
            res.status(409).json({success:false,message:'updation failed ',})
        }
      }
      async deleteUser(req:Request,res:Response,id:string){
        try {
          const deleteUser = await this.adminServices.deleteUser(id);
          res.status(200).json({
            success: true,
            message: "User deleted Succesfully",
            deletedUser: deleteUser,
          });
        } catch (error) {
          res.status(500).json({success:false,message:"error occured while deleting user"})
        }
      }

      async logoutAdmin(req:Request,res:Response){
        try {
    
          res.clearCookie('jwt');
    
          res.status(200).json({ message: "Admin Logout successful" });
        } catch (error:any) {
          console.log(error);
         res.status(400).json({ message: error.message });
        }
      }
}
