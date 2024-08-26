import express from 'express';
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';
import NodeCache from 'node-cache';
//importing routes
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/products.js";
import orderRoute from "./routes/orders.js";
const port = 3000;
connectDB();
export const myCache = new NodeCache();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Working");
});
//use of routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoute);
app.use("/uploads", express.static("uploads"));
//use to get error in the beginning, when next is called in user.ts\controller the next function will execute this
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Server on http://loacalhost:${port}`);
});
