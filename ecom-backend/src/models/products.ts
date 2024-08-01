import mongoose from "mongoose";
import { trim } from "validator";

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true,"Please enter your name"]
        },
        photo: {
            type: String,
            require: [true,"Please upload photo"]
        },

        price: {
            type: Number,
            enum:["Male","Female","Other"],
            require: [true,"Gender Missing"]
        },
        stock: {
            type: Number,
            require: [true,"Date of birth is missing"]
        },
        category: {
            type: String,
            require: [true,"Please enter product category"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }

);


export const Product = mongoose.model("Product",schema);
