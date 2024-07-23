import mongoose from "mongoose";
import validator from "validator";
const schema = new mongoose.Schema({
    _id: {
        type: String,
        require: [true, "Please Enter your ID"]
    },
    name: {
        type: String,
        require: [true, "Please enter your name"]
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        require: [true, "Email is missing"],
        validate: validator.default.isEmail,
    },
    photo: {
        type: String,
        require: [true, "Please upload you photo"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        require: [true, "Gender Missing"]
    },
    dob: {
        type: Date,
        require: [true, "Date of birth is missing"]
    },
}, {
    timestamps: true,
});
schema.virtual("age").get(function () {
    if (!this.dob) {
        return null; // or handle the case where dob is undefined or null as needed
    }
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth()
        ||
            today.getMonth() === dob.getMonth()
                &&
                    today.getDate() < dob.getDate()) {
        age--;
    }
    return age;
});
export const User = mongoose.model("User", schema);
