import { IupdateUser } from "../interface/userInterface";
import { userAxiosInstance } from "./userAxiosInstance";

export const getUserProfile = async () => {
  try {
    console.log("update user profile api");
    const res = await userAxiosInstance.get("/admin/usersList");

    return res;
  } catch (error) {
    console.log("Error in the getUserProfile", error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res = await userAxiosInstance.post(`/admin/deleteUser/${id}`);
    console.log("Updated User:", res.data);

    console.log("NewData:", res);

    return res;
  } catch (error) {
    console.log("Error in the deleteUser", error);
  }
};

export const updateUserProfile = async (id:string,userData: IupdateUser) => {
  try {
    console.log("update user profile api", userData);
    const res = await userAxiosInstance.post(`/admin/update/${id}`, userData);
    console.log("Updated User:", res.config.data);

    const newData = {
      name: res.data.user.name,
      email: res.data.user.email,
    };
  
    console.log("NewData after Updation :", newData);

    return newData;
  } catch (error) {
    console.log(error)
  }
};


export const getUserById= async (id:string) => {
  try {
    const res = await userAxiosInstance.get(`/admin/userById/${id}`);
    console.log("User get By Id",res);

    return res;
  } catch (error) {
    console.log("Error in the getUserProfile", error);
  }
};


export const logoutAdmin = async () => {
  try {
    const res = await userAxiosInstance.post(`/admin/logout`);
    console.log("Admin  logout succesfully", res);
    return res;
  } catch (error) {
    console.log("Error in the getUserProfile", error);
  }
};
