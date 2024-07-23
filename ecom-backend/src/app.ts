import express from 'express';
import { Request, Response, NextFunction } from "express";

//importing routes

import userRoutes from "./routes/user.js";
import { connectDB } from './utils/features.js';


const port = 3000;

connectDB();

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Working");
})

//use of routes
app.use("/api/v1/user", userRoutes);


app.listen(port,()=>{
    console.log(`Server on http://loacalhost:${port}`)
})