import express from "express";
import { getBarChart, getDashboardStats, getLineChart, getPieChart } from "../controllers/admin-stats.js";
import { adminOnly } from "../middlewares/auth.js";
const app = express.Router();
//route -/api/v1/dashboard/stats
app.get("/stats", adminOnly, getDashboardStats);
//route -/api/v1/dashboard/pie
app.get("/pie", adminOnly, getPieChart);
//route -/api/v1/dashboard/bar
app.get("/bar", adminOnly, getBarChart);
//route -/api/v1/dashboard/line
app.get("/line", adminOnly, getLineChart);
export default app;
