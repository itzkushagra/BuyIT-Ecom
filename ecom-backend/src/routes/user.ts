import express from "express";
import { deleteUser, getAllUsers, newUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";


const app = express.Router();

//route -/api/v1/user/new
app.post("/new", newUser);

app.route("/:id").get(adminOnly,getAllUsers).delete(adminOnly, deleteUser);
 


export default app;