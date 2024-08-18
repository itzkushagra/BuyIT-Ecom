import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { deleteProduct, getAdminProducts, getCategories, getLatestProduct, getSingleProduct, newProduct, searchAllProducts, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
const app = express.Router();
// create new product 
app.post("/new", adminOnly, singleUpload, newProduct);
//get all product
app.get("/all", searchAllProducts);
//get last 5 new products
app.get("/latest", getLatestProduct);
//get all the categories
app.get("/categories", getCategories);
//get all the products
app.get("/admin-products", adminOnly, getAdminProducts);
app
    .route("/:id")
    .get(getSingleProduct)
    .put(adminOnly, singleUpload, updateProduct)
    .delete(deleteProduct);
export default app;
