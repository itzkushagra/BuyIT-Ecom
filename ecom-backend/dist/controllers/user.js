import { User } from "../models/user.js";
export const newUser = async (req, res, next) => {
    try {
        throw new Error();
        const { name, email, photo, gender, _id, dob } = req.body;
        const user = await User.create({
            name,
            email,
            photo,
            gender,
            _id,
            dob: new Date(dob),
        });
        res.status(200).json({
            success: true,
            message: `Welcome, ${user.name}`,
        });
    }
    catch (error) {
        next(error);
    }
};
