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
            !total
        ) return next(new ErrorHandler("Please Enter All fields", 400));

        const order = await Order.create({
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
        await inValidateCache({
            product:false,
            order:true,
            admin:true, 
            userId: String(user),
            productId: order.orderItems.map(i=> String(i.productId)),
        });

        return res.status(201).json({
            success: true,
            message: "Order Placed Sucessfully",
        });
});

export const myOrder = TryCatch(async(
    req, res, next)=>{
    
        const {id: user} = req.query;
        const key = `my-orders-${user}`;
        let orders=[];
        if(myCache.has(key)) 
            orders = JSON.parse(myCache.get(key) as string);
        else{
            orders = await Order.find({user});
            myCache.set(key,JSON.stringify(orders));
        }
        return res.status(200).json({
            success: true,
            orders,
        });
});


export const allOrder = TryCatch(async(
    req, res, next)=>{
    
        const {id: user} = req.query;
        const key = `all-orders`;
        let orders=[];
        if(myCache.has(key)) 
            orders = JSON.parse(myCache.get(key) as string);
        else{
            orders = await Order.find().populate("user","name");
            myCache.set(key,JSON.stringify(orders));
        }

        return res.status(200).json({
            success: true,
            orders,
        });
});

export const singleOrder = TryCatch(async(
    req, res, next)=>{
        const {id} = req.params;
        const key = `order-${id}`;
        let data;
        if(myCache.has(key)) 
            data = JSON.parse(myCache.get(key) as string);
        else{
            console.log(id);
            data = await Order.findById(id).populate("user","name");
            if(!data) return next(new ErrorHandler("Order Not Found",404));
            myCache.set(key,JSON.stringify(data));
        }

        return res.status(200).json({
            success: true,
            data,
        });
});

export const processOrder = TryCatch(async(
    req,res,next)=>{

        const {id} = req.params;
        const order = await Order.findById(id);
        if(!order) return next(new ErrorHandler("Order not found",404));

        switch(order.status){
            case "Processing":
                order.status = "Shipped";
                break;
            case "Shipped":
                order.status = "Delivered";
                break;
            default:
                order.status = "Delivered";
                break;
        }

        await order.save();
        
        await inValidateCache({
            product:false,
            order:true,
            admin:true, 
            userId: order.user,
            orderId: String(order._id),
        });

        return res.status(200).json({
            success: true,
            message:"Order Processed Successfully",
        });
});

export const deleteOrder = TryCatch(async(
    req,res,next)=>{

        const {id} = req.params;
        const order = await Order.findById(id);
        if(!order) return next(new ErrorHandler("Order not found",404));

        await order.deleteOne();
        await inValidateCache({
            product:false,
            order:true,
            admin:true, 
            userId: order.user,
            orderId: String(order._id),
            productId: order.orderItems.map(i=> String(i.productId)),
        });
        
        return res.status(200).json({
            success: true,
            message:"Order Deleted Successfully",
        });
});