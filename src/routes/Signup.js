const express = require("express");
const { signUpUser } = require("../controller/Signup");

const router = express.Router();

router.post('/register', signUpUser);

module.exports = router;
