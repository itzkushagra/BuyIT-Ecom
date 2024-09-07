import { Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import { inValidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utilityclass.js";
import { myCache } from "../app.js";

export const newOrder = TryCatch(async(
    req:Request<{},{}, NewOrderRequestBody>, res, next)=>{
        const {
            shippingInfo, 
            orderItems, 
            user, 
            subtotal,
            tax,
            shippingCharges,
            discount,
            total,
        } = req.body;
    
        if(!shippingInfo || 
            !orderItems || 
            !user || 
            !subtotal ||
            !tax ||
            !shippingCharges ||
            !discount ||
            !total
        ) return next(new ErrorHandler("Please Enter All fields", 400));

        await Order.create({
            shippingInfo, 
            orderItems, 
            user, 
            subtotal,
            tax,
            shippingCharges,
            discount,
            total,
        });
        await reduceStock(orderItems);
        await inValidateCache({product: true, order: true, admin: true});

        return res.status(201).json({
            success: true,
            message: "Order Placed Sucessfully",
        });
});

export const myOrder = TryCatch(async(
    req, res, next)=>{
    
        const {id: user} = req.query;
        let orders=[];
        if(myCache.has("")) orders = JSON.parse(myCache.get("") as string);
        else{
            orders = await Order.find({user})
        }

        return res.status(201).json({
            success: true,
            message: "Order Placed Sucessfully",
        });
});

