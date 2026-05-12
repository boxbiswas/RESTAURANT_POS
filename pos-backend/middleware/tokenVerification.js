const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const User = require("../models/userModel");
const config = require("../config/config");


const isVerifiedUser = async function (req, res, next) {
    try {
        
        const { accessToken } = req.cookies;

        if (!accessToken) {
            const error = createHttpError(401, "Access token is missing");
            return next(error);
        }

        const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);

        const user = await User.findById(decodeToken.id);
        if (!user) {
            const error = createHttpError(401, "User not found");
            return next(error);
        }

        req.user = user;
        return next();

    } catch (error) {
        const err = createHttpError(401, "Invalid access token");
        return next(err);
    }
};

module.exports = {
    isVerifiedUser
}
