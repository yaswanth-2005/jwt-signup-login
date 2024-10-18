const User = require("../models/User")

async function getUserById(req, res) {
    try {
        const userId = await req.user.id;
        console.log(userId);
        const user = await User.findById(userId);
        if (!user)
            res.status(404).json({ message: "User Not Found" })
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: "Internal server Errors" })
    }
}

module.exports = { getUserById };