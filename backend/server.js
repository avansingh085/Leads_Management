import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';

import LeadRoutes from './routes/lead.route.js';

import AuthRoutes from './routes/auth.route.js';

import UserRoutes from './routes/user.route.js';

import connectDB from "./config/db.config.js";

dotenv.config();

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true,  
}))
connectDB();

app.use('/api/leads',LeadRoutes);

app.use('/api/auth',AuthRoutes);

app.use('/api/user',UserRoutes);

app.listen(process.env.PORT,()=>{
    console.log("server is running port ",process.env.PORT);
})