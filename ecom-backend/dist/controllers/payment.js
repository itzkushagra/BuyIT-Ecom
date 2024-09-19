import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupons.js";
import ErrorHandler from "../utils/utilityclass.js";
export const newCoupon = TryCatch(async (req, res, next) => {
    const { code, amount } = req.body;
    if (!code || !amount)
        return next(new ErrorHandler("Coupon Code or amount is missing", 400));
    await Coupon.create({ code, amount });
    return res.status(201).json({
        success: true,
        message: `Coupon ${code} created successfully`,
    });
});
