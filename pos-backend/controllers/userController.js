const createHttpError = require("http-errors");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");


const register = async (req, res, next) => {
    try {

        const { name, phone, email, password, role } = req.body;

        if (!name || !phone || !email || !password || !role) {
            const error = createHttpError(400, "All fields are required");
            return next(error);
        }

        const isUserPresent = await User.findOne({ email });
        if (isUserPresent) {
            const error = createHttpError(409, "User with this email already exists");
            return next(error);
        }

        const newUser = await User.create({ name, phone, email, password, role });

        res.status(201).json({ success: true, message: "User registered successfully", data: newUser });

    } catch (error) {
        return next(error);
    }
}

const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            const error = createHttpError(400, "Email and password are required");
            return next(error);
        }

        const isUserPresent = await User.findOne({ email });
        if (!isUserPresent) {
            const error = createHttpError(401, "Invalid email or password");
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, isUserPresent.password);
        if (!isMatch) {
            const error = createHttpError(401, "Invalid email or password");
            return next(error);
        }

        const jwtSecret = config.accessTokenSecret || "dev-access-secret";
        const accessToken = jwt.sign({ id: isUserPresent._id }, jwtSecret, {
            expiresIn: "1d"
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: config.nodeEnv === "production",
            sameSite: config.nodeEnv === "production" ? "none" : "lax",
            maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
        });

        res.status(200).json({ success: true, message: "Login successful", data: isUserPresent });

    } catch (error) {
        return next(error);
    }
}


const getUserData = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id);
        res.status(200).json({ success: true, data: user });

    } catch (error) {
        return next(error);
    }
}


const logout = async (req, res, next) => {
    try {
        res.clearCookie("accessToken");
        res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        return next(error);
    }
}


module.exports = {
    register,
    login,
    getUserData,
    logout
}