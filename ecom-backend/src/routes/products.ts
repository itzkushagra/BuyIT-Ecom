import express from "express";
import { deleteUser, getAllUsers, newUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
import { deleteProduct, getAdminProducts, getCategories, getLatestProduct, getSingleProduct, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";


const app = express.Router();
// create new product 
app.post("/new",adminOnly, singleUpload, newProduct);

//get last 5 new products
app.get("/latest",getLatestProduct);

//get all the categories
app.get("/categories", getCategories);

//get all the products
app.get("/admin-products", getAdminProducts);

app
.route("/:id")
.get(getSingleProduct)
.put(singleUpload, updateProduct)
.delete(deleteProduct);

export default app;