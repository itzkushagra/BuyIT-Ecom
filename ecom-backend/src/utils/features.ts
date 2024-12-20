import mongoose from "mongoose"
import { InvalidateCacheProps, OrderItemType } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/products.js";
import { Order } from "../models/order.js";

export const connectDB = (uri: string)=>{
    mongoose.connect(uri,{
        dbName:"BuyIT-ECOM",
    }).then(c=>console.log(`DB Connected to ${c.connection.host}`))
    .catch((e)=> console.log(e))
    ;
};

export const inValidateCache = async ({
    product, 
    order, 
    admin, 
    userId, 
    orderId, 
    productId,
}: InvalidateCacheProps)=>  {
    
    if(product){
        const productKeys: string[]=[
            "latest",
            "categories",
            "all-products",
            `product-${productId}`,
        ];
        console.log(typeof productId);
        if(typeof productId==="string") 
          productKeys.push(`product-${productId}`);

        if(typeof productId==="object") 
        {
            productId.forEach((i)=>productKeys.push(`product-${i}`));
        }

        myCache.del(productKeys);
    }

    if(order){
        const orderKeys: string[] = [
            "all-orders",
            `my-orders-${userId}`,
            `order-${orderId}`,
        ];
        myCache.del(orderKeys); 
    }
    if(admin){

    }
};

export const reduceStock = async (orderItems: OrderItemType[])=>{
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if(!product) throw new Error("Product Not Found");
        if(product.stock) product.stock -= order.quantity;
        await product.save();
    };
};

export const calculatePercentage = (thisMonth: number, lastMonth: number)=>{
    if(lastMonth===0) return thisMonth*100;
    const result = (thisMonth-lastMonth)/lastMonth*100;
    return Number(result.toFixed(0));
};

export const getInventories = async({categories, productCount}:{categories: string[];productCount: number;})=>{
    const categoriesCountPromise = categories.map(category=>  Product.countDocuments({category}));
          const categoriesCount = await Promise.all(categoriesCountPromise);
    const categoryCount: Record<string,number>[]=[];

    categories.forEach((category:any,i)=>{
    categoryCount.push({
        [category]:Math.round((categoriesCount[i]/productCount)*100 ),
    })
    })
    return categoryCount;
}