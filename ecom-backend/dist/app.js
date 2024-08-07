import express from 'express';
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';
//importing routes
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/products.js";
const port = 3000;
connectDB();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Working");
});
//use of routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/uploads", express.static("uploads"));
//use to get error in the beginning, when next is called in user.ts\controller the next function will execute this
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Server on http://loacalhost:${port}`);
});
