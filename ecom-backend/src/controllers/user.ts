import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import { error } from "console";
import ErrorHandler from "../utils/utilityclass.js";
import { TryCatch } from "../middlewares/error.js";

export const newUser =  TryCatch(
    async(
        req:Request<{},{}, NewUserRequestBody>,
        res: Response,
        next: NextFunction)=>{
                const {name, email, photo, gender, _id, dob} = req.body;
                const user = await User.create({
                    name, 
                    email, 
                    photo, 
                    gender,  
                    _id, 
                    dob: new Date(dob),
                });
                res.status(200).json({
                    success: true,
                    message: `Welcome, ${user.name}`,
                })
            } 
);
