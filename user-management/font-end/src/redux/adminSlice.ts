import { createSlice } from "@reduxjs/toolkit";


const storeAdmin = localStorage.getItem("admin");


const initialState = {
  admin: storeAdmin ? JSON.parse(storeAdmin) : null,
};


const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("admin", JSON.stringify(state.admin));
    },
    update: (state, action) => {
      console.log("Payload", action.payload);
      if (state.admin) {
        state.admin = { ...state.admin, ...action.payload };
        localStorage.setItem("admin", JSON.stringify(state.admin));
      }
    },
    adminLogout:(state)=>{
      localStorage.removeItem('admin');
      state.admin = null;
    }
  },
});




export const { login,update,adminLogout } = adminSlice.actions;

export default adminSlice.reducer;