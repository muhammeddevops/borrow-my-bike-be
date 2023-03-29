// const mongoose = require("mongoose");
// const ENV = process.env.NODE_ENV || "development";
// require("dotenv").config({
//   path: `${__dirname}./.env.${ENV}`,
// });

// let dbURI;
// if (process.env.NODE_ENV === "development") {
//   dbURI = process.env.DATABASE_LOCAL_DB;
// }
// if (process.env.NODE_ENV === "test") {
//   dbURI = process.env.DATABASE_TEST_DB;
// }
// if (process.env.NODE_ENV === "production") {
//   dbURI = process.env.DATABASE_PROD_DB;
// }

// mongoose
//   .connect(dbURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Database connected"))
//   .catch((error) => console.log(`Error connecting to database: ${error}`));

const mongoose = require("mongoose");

const connStr =
  "mongodb+srv://thereactorsmcr:Northcoders123@cluster1.nhdvvfk.mongodb.net/test";

const connectDB = async () => {
  await mongoose
    .connect(connStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(`Error connecting to database: ${error}`));
};

const disconnectDB = async () => {
  await mongoose.disconnect();
};

module.exports = { connectDB, disconnectDB };
