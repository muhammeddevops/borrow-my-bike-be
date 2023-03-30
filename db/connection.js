const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "test",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(`Error connecting to database: ${error}`));

module.exports = mongoose;
