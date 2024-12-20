import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/order.js";
import { Product } from "../models/products.js";
import { User } from "../models/user.js";
import { calculatePercentage, getInventories } from "../utils/features.js";
export const getDashboardStats = TryCatch(async (req, res, next) => {
    let stats = {};
    if (myCache.has("admin-stat"))
        stats = JSON.parse(myCache.get("admin-stat"));
    else {
        const today = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const thisMonth = {
            start: new Date(today.getFullYear(), today.getMonth(), 1),
            end: today,
        };
        const lastMonth = {
            start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
            end: new Date(today.getFullYear(), today.getMonth(), 0),
        };
        const thisMonthProductsPromise = Product.find({
            createdAt: {
                $gte: thisMonth.start,
                $lte: thisMonth.end,
            },
        });
        const lastMonthProductsPromise = Product.find({
            createdAt: {
                $gte: lastMonth.start,
                $lte: lastMonth.end,
            },
        });
        const thisMonthUserPromise = User.find({
            createdAt: {
                $gte: thisMonth.start,
                $lte: thisMonth.end,
            },
        });
        const lastMonthUserPromise = User.find({
            createdAt: {
                $gte: lastMonth.start,
                $lte: lastMonth.end,
            },
        });
        const thisMonthOrderPromise = Order.find({
            createdAt: {
                $gte: thisMonth.start,
                $lte: thisMonth.end,
            },
        });
        const lastMonthOrderPromise = Order.find({
            createdAt: {
                $gte: lastMonth.start,
                $lte: lastMonth.end,
            },
        });
        const lastSixMonthOrdersPromise = Order.find({
            createdAt: {
                $gte: sixMonthsAgo,
                $lte: today,
            },
        });
        const latestTransactionsPromise = Order.find({}).select(["orderItems", "discount", "total", "status"]).limit(4);
        const [thisMonthProducts, lastMonthProducts, thisMonthUser, lastMonthUser, thisMonthOrder, lastMonthOrder, productCount, userCount, allOrders, lastSixMonthOrders, getCategories, femaleUserCount, latestTransaction] = await Promise.all([thisMonthProductsPromise,
            lastMonthProductsPromise, thisMonthUserPromise,
            lastMonthUserPromise, thisMonthOrderPromise,
            lastMonthOrderPromise,
            Product.countDocuments(),
            User.countDocuments(),
            Order.find({}).select("total"),
            lastSixMonthOrdersPromise,
            Product.distinct("category"),
            User.countDocuments({ gender: "female" }),
            latestTransactionsPromise,
        ]);
        const thisMonthRevenue = thisMonthOrder.reduce((total, order) => total + (order.total || 0), 0);
        const lastMonthRevenue = lastMonthOrder.reduce((total, order) => total + (order.total || 0), 0);
        const percentageChange = {
            revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
            productChangePercent: calculatePercentage(thisMonthProducts.length, lastMonthProducts.length),
            userChangePercent: calculatePercentage(thisMonthUser.length, lastMonthUser.length),
            orderChangePercent: calculatePercentage(thisMonthOrder.length, lastMonthOrder.length),
        };
        const revenue = allOrders.reduce((total, order) => total + (order.total || 0), 0);
        const count = {
            revenue,
            product: productCount,
            user: userCount,
            order: allOrders.length,
        };
        const orderMonthCounts = new Array(6).fill(0);
        const orderMonthlyRevenue = new Array(6).fill(0);
        lastSixMonthOrders.forEach((order) => {
            const creationDate = order.createdAt;
            const monthDifference = today.getMonth() - creationDate.getMonth();
            if (monthDifference < 6) {
                orderMonthCounts[6 - monthDifference - 1] += 1;
                orderMonthlyRevenue[6 - monthDifference - 1] += order.total;
            }
        });
        const categoryCount = await getInventories({
            categories,
            productsCount,
        });
        const userRatio = {
            male: userCount - femaleUserCount,
            female: femaleUserCount,
        };
        const modifiedTransactions = latestTransaction.map(i => ({
            _id: i._id,
            discount: i.discount,
            amount: i.total,
            quantity: i.orderItems.length,
            status: i.status,
        }));
        stats = {
            categoryCount,
            percentageChange,
            count,
            chart: {
                order: orderMonthCounts,
                revenue: orderMonthlyRevenue,
            },
            userRatio,
            latestTransaction: modifiedTransactions,
        };
        myCache.set("admin-stats", JSON.stringify(stats));
    }
    return res.status(200).json({
        success: true,
        stats,
    });
});
export const getPieChart = TryCatch(async (req, res, next) => {
    let charts;
    if (myCache.has("admin-pie-charts"))
        charts = JSON.parse(myCache.get("admin-pie-charts"));
    else {
        const [processingOrder, shippedOrder, deliveredOrder] = await Promise.all([
            Order.countDocuments({ status: "Processing" }),
            Order.countDocuments({ status: "Shipped" }),
            Order.countDocuments({ status: "Delivered" }),
        ]);
        const orderFullfillment = {
            processing: processingOrder,
            shipped: shippedOrder,
            delivered: deliveredOrder,
        };
        charts = {
            orderFullfillment,
        };
        myCache.set("admin-pie-charts", JSON.stringify(charts));
    }
    return res.status(200).json({
        success: true,
        charts,
    });
});
export const getBarChart = TryCatch(async () => { });
export const getLineChart = TryCatch(async () => { });
