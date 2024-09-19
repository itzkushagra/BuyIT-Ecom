import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupons.js";
import ErrorHandler from "../utils/utilityclass.js";

export const newCoupon = TryCatch(async (req,res,next)=>{
    const {code,amount}=req.body;
    
    if( !code || !amount)
        return next(new ErrorHandler("Coupon Code or amount is missing",400));

    await Coupon.create({code,amount});
    return res.status(201).json({
        success: true,
        message: `Coupon ${code} created successfully`,
    });
});

export const applyDiscount = TryCatch(async (req,res,next)=>{
    const {coupon}=req.query;
    const discount = await Coupon.findOne({code:coupon});
    if( !discount )
        return next(new ErrorHandler("Coupon is Invalid",400));


    return res.status(200).json({
        success: true,
        discout: discount.amount,
    });
});

export const allCoupon = TryCatch(async (req,res,next)=>{
    const coupon = await Coupon.find({});
    if( !coupon )
        return next(new ErrorHandler("Coupon is Invalid",400));


    return res.status(200).json({
        success: true,
        coupon,
    });
});
