import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
import { myOrder, newOrder } from "../controllers/orders.js";


const app = express.Router();

//route -/api/v1/order/new
app.post("/new", newOrder);

app.get("/my",myOrder);

export default app;