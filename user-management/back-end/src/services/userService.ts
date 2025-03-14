import { userRepository } from "../repositories/userRepository";
import { UserLogin,UserRegister,IupdateUser } from "../interface/userIN";
import { hashPassword,comparePassword } from "../utils/bcrypt";

export class userService{
    private userRepository:userRepository
    constructor() {
        this.userRepository = new userRepository();
    }

    async createUser(data:UserRegister){
        const alreadyExisting = await this.userRepository.findByEmail(data.email);
        if (alreadyExisting) {
            throw new Error("Email already Existing");
        }
        const hashedPassword = await hashPassword(data.password);
        const newUser = {
          name: data.name,
          email: data.email,
          password: hashedPassword,
        };
        await this.userRepository.createUser(newUser);
    }
    
    async AuthUser(data: UserLogin) {
        const AuthUser = await this.userRepository.UserAuth(data);
        if (!AuthUser) {
          throw new Error("Email  Doesnot match");
        }
    
        console.log("Email:", data);
    
        const PasswordMatch = await comparePassword(
          data.password,
          AuthUser.password
        );
    
        if (!PasswordMatch) {
          throw new Error("The password doesnot match");
        }
    
        return AuthUser;
      }

      async UpdateUser(data:IupdateUser){
        const UpdateUser = await this.userRepository.updateUser(data)
        console.log('UpdatedUser in userService',UpdateUser)
        if(!UpdateUser){
          throw new Error("There is error in updating the user")
        }
        return UpdateUser;
      }
    
      async GetUser(userId:string){
       return await this.userRepository.getUser(userId)
      }

      async GetUserById(id: string) {
        return await this.userRepository.getUser(id);
      }
      
      async GetUserByEmail(email: string) {
        return await this.userRepository.findByEmail(email);
      }
      
}

