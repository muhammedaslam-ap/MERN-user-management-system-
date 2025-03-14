import express from 'express'
const app = express()
import { connectDB } from './config/connectDB';
import dotenv from 'dotenv';
import { UserRoutes } from "./routes/userRoute";
import { AdminRoute } from './routes/adminRoute';
import cors from 'cors'

dotenv.config();
connectDB()
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use("/", new UserRoutes().router);
app.use("/admin", new AdminRoute().router);


app.listen(3000,()=>console.log('server running'))  