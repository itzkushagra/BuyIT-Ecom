import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/products.js";
export const connectDB = (uri) => {
    mongoose.connect(uri, {
        dbName: "BuyIT-ECOM",
    }).then(c => console.log(`DB Connected to ${c.connection.host}`))
        .catch((e) => console.log(e));
};
export const inValidateCache = async ({ product, order, admin, }) => {
    if (product) {
        const productKeys = [
            "latest", "categories", "all-products",
        ];
        const products = await Product.find({}).select("_id");
        products.forEach(i => {
            productKeys.push(`product-${i._id}`);
        });
        myCache.del(productKeys);
    }
    if (order) {
    }
    if (admin) {
    }
};
