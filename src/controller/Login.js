const bcrypt = require("bcrypt");
const User = require("../models/User")
const { generateToken, verifyToken, generateRefreshToken } = require("../utils/authUtils")

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found..")
        }
        // console.log(user)
        // console.log(password);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // console.log(isPasswordValid)
        if (!isPasswordValid) {
            throw new Error("Invalid Password");
        }
        const token = await generateToken(user);
        // console.log(token);
        res.status(200).json({ user: user, token: token })

    } catch (error) {
        console.error(error.message);
        res.status(401).json({ message: "Invalid credentials" })
    }
}

async function refreshToken(req, res) {
    try {
        const { oldToken } = req.body;
        const decodedToken = verifyToken(oldToken);
        console.log("decodedn:", decodedToken);
        const existingUser = await User.findById(decodedToken.id);
        if (!existingUser) {
            throw new error("User not Found..");
        }
        const newToken = generateRefreshToken(existingUser);
        res.json({ token: newToken })
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ message: "Invalid token" })
    }
}

module.exports = { login, refreshToken };