//custom handler to allow only admin to access admin rights

import { User } from "../models/user.js";
import ErrorHandler from "../utils/utilityclass.js";
import { TryCatch } from "./error.js";


export const adminOnly = TryCatch(async (req, res, next) => {
    const { id } = req.query;

    if (!id) return next(new ErrorHandler("Please Login", 401));
  
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("User doesn't exist", 401));
    if (user.role !== "admin")
      return next(new ErrorHandler("You dont have access to this feature", 403));
  
    next();
  });