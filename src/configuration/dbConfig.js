const mongoose = require('mongoose');
const dontenv = require('dotenv')

dontenv.config();

mongoose.connect(`process.env.MONGODB_URI
`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
})
    .then(() => console.log("Db connected.."))
    .catch((err) => console.log("Error connecting the db", err));

module.exports = mongoose;
