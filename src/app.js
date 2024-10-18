const express = require("express");
const signUpRoute = require("./routes/Signup")
const loginRoute = require("./routes/Login")
const bodyParser = require("body-parser");
const cors = require("cors");
const { createAdminAccount } = require("./scripts/setup")
const authenticatedRoute = require("./routes/Authenticated")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors())

createAdminAccount();

app.use("/user", signUpRoute)
app.use("/auth", loginRoute)
app.use("/api", authenticatedRoute)


app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`)
})