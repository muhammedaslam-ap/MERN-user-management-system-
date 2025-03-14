import { Request, Response } from "express";
import { userService } from "../services/userService";
import { UserLogin,UserRegister } from "../interface/userIN";
import jwt from "jsonwebtoken";
import { ICustomRequest } from "../middleware/auth";

export class UserController{
    private userService: userService;
    constructor() {
      this.userService = new userService();
    }

    async createUser(req: Request, res: Response) {
        try {
          const data = req.body as UserRegister;
    
          await this.userService.createUser(data);
          res.status(200)
            .json({ success: true, message: "user created succesfully" });
        } catch (error) {
          if (error instanceof Error) {
            res.status(500).json({ success: false, message: error.message });
          }
        }
      }

      async authUser(req: Request, res: Response) {
        try {
          const data = req.body as UserLogin;
    
          const user = await this.userService.AuthUser(data);
          const SECRET = process.env.SECRET;
          if (!SECRET) {
            throw new Error("The SECRET key is missing");
          }
    
          const token = jwt.sign({ _id: user._id, email: user.email }, SECRET, {
            expiresIn: "1d",
          });
    
          res.status(200).json({
            success: true,
            message: "User logged in succesfully",
            userAccessToken: token,
            user,
          });
        } catch (error) {
          if (error instanceof Error) {
            res.status(409).json({ success: false, message: error.message });
          }
        }
      }

      async getUser(req: Request, res: Response) {
        try {
          const userId = (req as ICustomRequest).user._id;
          console.log('USERId:',userId)
          const getUser = await this.userService.GetUser(userId);
          console.log("GETUSER",getUser)
          res.json({
            success: true,
            user: getUser,
          });
        } catch (error) {
    
          if (error instanceof Error) {
            res.status(500).json({ success: false, message: error.message });
          }
        }
      }

      async updateUser(req: Request, res: Response) {
        try {
          const { email, id,...otherData } = req.body; 
          console.log("Data while Updating:", req.body);
      
          if (!email) {
            return res.status(400).json({ success: false, message: "User email is required" });
          }

          // if (!name.trim()) {
          //   return res.status(400).json({ success: false, message: "User Name is required" });
          // }
      
          const existingUser = await this.userService.GetUserById(id);
          if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
          }
      
          const emailExists = await this.userService.GetUserByEmail(email);
          if (emailExists && emailExists.id !== id) {
            return res.status(409).json({ success: false, message: "Email is already in use by another account" });
          }
      
          const updatedUser = await this.userService.UpdateUser({ id, email, ...otherData });
      
          return res.status(200).json({
            success: true,
            user: updatedUser,
          });
        } catch (error) {
          console.error("Error updating user:", error);
          return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal Server Error",
          });
        }
      }
      

      async logoutUser(req:Request,res:Response){
        try {
          res.clearCookie('jwt');
              return res.status(200).json({ message: "Logout successful" });
    
        } catch (error:any) {
            console.log(error);
          return  res.status(400).json({ message: error.message });
        }
      }
    
}