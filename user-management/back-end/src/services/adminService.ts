import { AdminRepository } from "../repositories/adminRepository";
import { AdminLogin, AdminRegister } from "../interface/adminIN";
import { comparePassword } from "../utils/bcrypt";

export class adminService{
    private adminRepository:AdminRepository

    constructor(){
        this.adminRepository = new AdminRepository();
    }

    async AuthAdmin(data:AdminLogin){
        const AuthAdmin = await this.adminRepository.AdminAuth(data);
        if (!AuthAdmin) {
          throw new Error("Email Doesnot match for the admin");
        }
        const PasswordMatch = await comparePassword(
          data.password,
          AuthAdmin.password
        );
          if (!PasswordMatch) {
            throw new Error("The password doesnot match");
          }
          return AuthAdmin;
    }

    async getUsers(){
      const getUsers = await this.adminRepository.getUser();
      return getUsers;
    }

    async deleteUser(id:string){
      const deletedUser = await this.adminRepository.deleteUser(id);
      return deletedUser;
    }

    async updateUser(id:string,user:any){
      const updatedUser = await this.adminRepository.updateUser(id,user);
      
      return updatedUser;
    }

    async getUserById(id:string){
      const userData = await this.adminRepository.getUserById(id);
      return userData;
    }
  }