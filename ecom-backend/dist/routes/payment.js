import express from "express";
import { allCoupon, applyDiscount, newCoupon } from "../controllers/payment.js";
const app = express.Router();
//route -/api/v1/payment/coupon/new
app.post("/coupon/new", newCoupon);
//route -/api/v1/payment/discount
app.post("/discount", applyDiscount);
//route -/api/v1/payment/coupon/all
app.post("/coupon/all", allCoupon);
export default app;
