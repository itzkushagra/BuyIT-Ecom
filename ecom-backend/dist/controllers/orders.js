import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/order.js";
import { inValidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utilityclass.js";
export const newOrder = TryCatch(async (req, res, next) => {
    const { shippingInfo, orderItems, user, subtotal, tax, shippingCharges, discount, total, } = req.body;
    if (!shippingInfo ||
        !orderItems ||
        !user ||
        !subtotal ||
        !tax ||
        !shippingCharges ||
        !discount ||
        !total)
        return next(new ErrorHandler("Please Enter All fields", 400));
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
    await inValidateCache({ product: true, order: true, admin: true });
    return res.status(201).json({
        success: true,
        message: "Order Placed Sucessfully",
    });
});
export const myOrder = TryCatch(async (req, res, next) => {
    return res.status(201).json({
        success: true,
        message: "Order Placed Sucessfully",
    });
});
