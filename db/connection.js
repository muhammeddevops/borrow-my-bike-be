const mongoose = require("mongoose");

const connStr =
  "mongodb+srv://thereactorsmcr:Northcoders123@cluster1.nhdvvfk.mongodb.net/development";

mongoose
  .connect(connStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(`Error connecting to database: ${error}`));

module.exports = mongoose;
