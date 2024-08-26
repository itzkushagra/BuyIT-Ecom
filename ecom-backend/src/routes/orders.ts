import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
import { newOrder } from "../controllers/orders.js";


const app = express.Router();

//route -/api/v1/order/new
app.post("/new", newOrder);


export default app;