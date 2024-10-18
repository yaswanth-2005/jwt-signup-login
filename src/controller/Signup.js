const User = require("../models/User");
const bcrypt = require("bcrypt");

async function signUpUser(req, res) {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: "customer"
        });
        const savedUser = await newUser.save();  // Await the save operation
        res.status(201).json({ message: "User created Successfully.", user: savedUser });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { signUpUser };
