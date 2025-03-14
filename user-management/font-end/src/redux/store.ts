import { configureStore } from "@reduxjs/toolkit"
import userReducer from './userSlice'
import adminReducer from './adminSlice'

export const RootStore = configureStore({
    reducer:{
        user:userReducer,
        admin:adminReducer
    }
});
export type RootState = ReturnType<typeof RootStore.getState>;
