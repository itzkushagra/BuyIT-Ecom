import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { allOrder, myOrder, newOrder } from "../controllers/orders.js";
const app = express.Router();
//route -/api/v1/order/new
app.post("/new", newOrder);
app.get("/my", myOrder);
app.get("/all", adminOnly, allOrder);
export default app;
