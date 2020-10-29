/* eslint-disable no-undef */
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { /*db,*/ redisClient } = require("../models");
//const User = db.user;

verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: `No token provided`
        });
    }

    try {
        redisClient.sismember("blacklist_token", token, (err, reply) => {
            if (reply === 1) {
                return res.status(400).json({
                    status: 400,
                    error: "Invalid Token"
                });
            }
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decoded) => {
                    if (err) {
                        return res.status(401).send({
                            message: `Unauthorized!`
                        });
                    }
                    req.userId = decoded.id;
                    next();
                }
            );
        });
    } catch (error) {
        return res.status(501).json({
            status: 501,
            error: error.toString()
        });
    }
};

isAdmin = (req, res, next) => {
    if (process.env.ADMIN_EMAIL == req.userId) {
        next();
        return;
    }
    res.status(403).send({
        message: `Need to access with admin`
    });
    return;
};

const authJWT = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};

module.exports = authJWT;
