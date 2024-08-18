import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/products.js";
import ErrorHandler from "../utils/utilityclass.js";
import { rm } from "fs";
export const newProduct = TryCatch(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo)
        return next(new ErrorHandler("PLease add the photo", 400));
    if (!name || !price || !stock || !category) {
        rm(photo.path, () => {
            console.log("Deleted");
        });
        return next(new ErrorHandler("Fields are empty", 400));
    }
    await Product.create({
        name,
        price,
        stock,
        category: category.toLowerCase(),
        photo: photo?.path,
    });
    return res.status(201).json({
        success: true,
        message: "Successfully Added",
    });
});
export const getLatestProduct = TryCatch(async (req, res, next) => {
    const product = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    return res.status(201).json({
        success: true,
        product,
    });
});
export const getCategories = TryCatch(async (req, res, next) => {
    const categories = await Product.distinct("category");
    return res.status(201).json({
        success: true,
        categories,
    });
});
export const getAdminProducts = TryCatch(async (req, res, next) => {
    const products = await Product.find({});
    return res.status(201).json({
        success: true,
        products,
    });
});
export const getSingleProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product)
        return next(new ErrorHandler("Product Not Found", 404));
    return res.status(201).json({
        success: true,
        product,
    });
});
export const updateProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    const product = await Product.findById(id);
    if (!product)
        return next(new ErrorHandler("Product Not Found", 404));
    if (photo) {
        rm(product.photo, () => {
            console.log("Old photo Deleted");
        });
        product.photo = photo.path;
    }
    if (name)
        product.name = name;
    if (price)
        product.price = price;
    if (stock)
        product.stock = stock;
    if (category)
        product.category = category;
    await product.save();
    return res.status(200).json({
        success: true,
        message: "Successfully Updated",
    });
});
export const deleteProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product)
        return next(new ErrorHandler("Product Not Found", 404));
    rm(product.photo, () => {
        console.log("Product Photo Deleted");
    });
    await Product.deleteOne();
    return res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
    });
});
export const searchAllProducts = TryCatch(async (req, res, next) => {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;
    const baseQuery = {};
    if (search)
        baseQuery.name = {
            $regex: search,
            $options: "i",
        };
    if (price)
        baseQuery.price = {
            $lte: Number(price), //lte- less than equal to
        };
    if (category)
        baseQuery.category = category;
    const productsPromise = Product.find()
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit) //limit of products to be displayed per page
        .skip(skip); //when we go to next page products of previous page will be skipped for loading
    //using the following to run both of these parallely otherwise they would have ran 1 after the other
    const [product, filteredProductOnly] = await Promise.all([
        productsPromise,
        Product.find(baseQuery)
    ]);
    const totalPage = Math.ceil(filteredProductOnly.length / limit); //if products are 51 and limit is 10 we would need atleast 6 pages, we'll get it by using ceil that converts 5.1 to 6
    return res.status(201).json({
        success: true,
        product,
        totalPage,
    });
});
