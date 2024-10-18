const jwt = require("jsonwebtoken");
// const secretKey = require("../configuration/jwtConfig");
const secretKey = require("../configuration/jwtConfig")

// const crypto = require("crypto");

// const secretKey = crypto.randomBytes(32).toString("hex");
console.log("key is:", secretKey)
async function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    return await jwt.sign(payload, secretKey, { expiresIn: "100" })
}

function generateRefreshToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, "Yaswanth", { expiresIn: "100" })
}

function verifyToken(token) {
    return jwt.verify(token, "Yaswanth")
}

module.exports = { generateToken, generateRefreshToken, verifyToken }