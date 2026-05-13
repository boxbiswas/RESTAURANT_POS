const createHttpError = require("http-errors");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildEmailMatch = (email = "") => {
    const normalized = String(email).trim();
    const escaped = escapeRegex(normalized);
    return {
        $regex: `^\\s*${escaped}\\s*$`,
        $options: "i",
    };
};


const register = async (req, res, next) => {
    try {

        const { name, phone, email, password, role } = req.body;
        const normalizedEmail = String(email || "").trim().toLowerCase();
        const normalizedRole = String(role || "").trim().toLowerCase();
        const normalizedPhone = String(phone || "").replace(/\D/g, "");

        if (!name || !normalizedPhone || !normalizedEmail || !password || !normalizedRole) {
            const error = createHttpError(400, "All fields are required");
            return next(error);
        }

        if (!["admin", "staff"].includes(normalizedRole)) {
            const error = createHttpError(400, "Please select a valid role");
            return next(error);
        }

        if (!/^\d{10}$/.test(normalizedPhone)) {
            const error = createHttpError(400, "Please enter a valid 10-digit phone number");
            return next(error);
        }

        const isUserPresent = await User.findOne({ email: buildEmailMatch(normalizedEmail) });
        if (isUserPresent) {
            const error = createHttpError(409, "User with this email already exists");
            return next(error);
        }

        const newUser = await User.create({
            name: String(name).trim(),
            phone: normalizedPhone,
            email: normalizedEmail,
            password,
            role: normalizedRole
        });

        res.status(201).json({ success: true, message: "User registered successfully", data: newUser });

    } catch (error) {
        return next(error);
    }
}

const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        const normalizedEmail = String(email || "").trim();

        if (!normalizedEmail || !password) {
            const error = createHttpError(400, "Email and password are required");
            return next(error);
        }

        const isUserPresent = await User.findOne({ email: buildEmailMatch(normalizedEmail) });
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