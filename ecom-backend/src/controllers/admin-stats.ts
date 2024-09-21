import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";

export const getDashboardStats = TryCatch(async(req,res,next)=>{
     let stats;
     if(myCache.has("admin-stat"))
        stats = JSON.parse(myCache.get("admin-stat") as string);
    else{

    }

    return res.status(200).json({
        success: true,
        stats,
    })
});

export const getPieChart = TryCatch(async()=>{});

export const getBarChart = TryCatch(async()=>{});

export const getLineChart = TryCatch(async()=>{});
