import { createSlice } from '@reduxjs/toolkit';

// Safely parse stored user data from localStorage
let storedUser = null;
try {
    storedUser = JSON.parse(localStorage.getItem("user") || 'null');
} catch (error) {
    console.error("Invalid user data in localStorage", error);
}

// Initial state
const initialState = {
    user: storedUser ? storedUser : null
};

// Redux Slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Login Reducer with payload validation
        login: (state, action) => {
            if (action.payload && typeof action.payload === 'object') {
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(state.user));
            } else {
                console.error("Invalid login payload");
            }
        },
        
        // Update Reducer with property protection
        update: (state, action) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    ...action.payload,
                    _id: state.user._id // Prevent overwriting sensitive data
                };
                localStorage.setItem("user", JSON.stringify(state.user));
            } else {
                console.error("No user found to update");
            }
        },

        // Logout Reducer with cleanup logic
        logout: (state) => {
            localStorage.removeItem("user");
            state.user = null;
        }
    }
});

// Export Actions and Reducer
export const { login, update, logout } = userSlice.actions;
export default userSlice.reducer;