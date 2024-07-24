import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/utilityclass.js";


export const errorMiddleware = (
    err:ErrorHandler,
    req:Request,
    res:Response,
    next:NextFunction
)=>{

    err.message ||="Oops Server Issue !!!"; // it means: err.message = err.message || "";
    err.statusCode ||=500;

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}