import { Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/products.js";


export const newProduct = TryCatch(
    async(req:Request<{},{},NewProductRequestBody>,res:Response,next)=>{
        const{name,price,stock,category} = req.body;
        const photo = req.file;

    await Product.create({
        name,
        price,
        stock,
        category: category.toLowerCase(),
        photo: photo?.path,
    });

    return res.status(201).json({
        success: true,
        message: "Successfully Added",
    });
    }
);