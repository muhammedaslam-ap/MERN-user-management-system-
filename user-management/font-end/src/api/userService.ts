import { IupdateUser } from "../interface/userInterface"
import { userAxiosInstance } from "./userAxiosInstance";

export const updateUserProfile = async (userData:IupdateUser)=>{
    try {
        console.log('update user profile api',userData);
        const res = await userAxiosInstance.post('/update',userData);
        console.log('Updated User:',res.config.data)

        const newData = {
          name: res.data.user.name,
          email: res.data.user.email,
          profileImage: res.data.user.profileImage,
        };
        console.log('NewData after Updation :',newData)

        return newData;
        
    } catch (error) {
        console.error(error)    
        throw error; 
}
}
export const getUserProfile = async () => {
  try {

    console.log("update user profile api");
    const res = await userAxiosInstance.get("/user/profile");
    console.log("Updated User:", res.data);

    const newData = {
      name: res.data.user.name,
      email: res.data.user.email,
      profileImage: res.data.user.profileImage
    };
    console.log('NewData:',newData)

    return newData;
  } catch (error) {
    console.log('Error in the getUserProfile',error)
  }
};



export const logoutUser = async () => {
  try {
    const res = await userAxiosInstance.post("/user/logout");
    console.log('User  logout succesfully',res)
    return res;
  } catch (error) {
    console.log("Error in the getUserProfile", error);
  }
  
};
