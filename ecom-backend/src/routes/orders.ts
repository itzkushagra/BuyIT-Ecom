import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
import { allOrder, deleteOrder, myOrder, newOrder, processOrder, singleOrder } from "../controllers/orders.js";


const app = express.Router();

//route -/api/v1/order/new
app.post("/new", newOrder);

app.get("/my",myOrder);

app.get("/all",adminOnly, allOrder);

app.route("/:id")
.get(singleOrder)
.put(adminOnly,processOrder)
.delete(adminOnly, deleteOrder);
export default app;