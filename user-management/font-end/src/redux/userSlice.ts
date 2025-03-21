import { createSlice } from '@reduxjs/toolkit';


let storedUser = null;
try {
    storedUser = JSON.parse(localStorage.getItem("user") || 'null');
} catch (error) {
    console.error("Invalid user data in localStorage", error);
}

const initialState = {
    user: storedUser ? storedUser : null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            if (action.payload && typeof action.payload === 'object') {
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(state.user));
            } else {
                console.error("Invalid login payload");
            }
        },
        
        update: (state, action) => {
            if (state.user) {
                state.user = {  ...state.user,
                    ...action.payload,
                    _id: state.user._id
                };
                localStorage.setItem("user", JSON.stringify(state.user));
            } else {
                console.error("No user found to update");
            }
        },

        logout: (state) => {
            localStorage.removeItem("user");
            state.user = null;
        }
    }
});

export const { login, update, logout } = userSlice.actions;
export default userSlice.reducer;