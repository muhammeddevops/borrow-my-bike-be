const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const router = require("./server/route/aouth.js");
const passport = require("./server/passport/setup");
const multer = require("multer");
const {
  handleWrongPathErrors,
  handle500Errors,
  handleBadRequestError,
  handleCustomErrors,
} = require("../errorHandlingControllers.js");
const { loginUserController } = require("./controllers/user.controllers");

const {
  postNewUserController,
  getUserInfoController,
  getAllUsersController,
} = require("./controllers/user.controllers");
const {
  postNewBikeController,
  getAllBikesController,
  getBikeByIdController,
  postNewBikePhotoController,
  patchBikeController,
} = require("./controllers/bike.controllers");

const connStr =
  "mongodb+srv://thereactorsmcr:Northcoders123@cluster1.nhdvvfk.mongodb.net/development";

const upload = multer({ dest: "uploads/" });

const app = express();

// Allow all requests from any domain //will need to update this when we host
app.use(cors());

// set up middleware
app.use(express.json());

//storring session
app.use(
  session({
    secret: "test_secret",
    resave: false,
    saveUninitalized: false,
    store: MongoStore.create({ mongoUrl: connStr }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.post("/api/auth/login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(400).json({ errors: "err in auth" });
    }
    if (!user) {
      return res.status(400).json({ errors: "No user found" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({ errors: "logIn err" });
      }
      return res.status(200).json({
        success: {
          id: user.id,
          username: user.username,
          img: user.avatar_img_url || "no image",
          credit_amount: user.credit_amount || 0,
        },
      });
    });
  })(req, res, next);
});

app.post("/api/users", postNewUserController);

app.get("/api/users/:id", getUserInfoController);

app.get("/api/users", getAllUsersController);

app.post("/api/bikes", postNewBikeController);

app.get("/api/bikes", getAllBikesController);

app.get("/api/bikes/:id", getBikeByIdController);

app.post("/api/bikephoto", upload.single("file"), postNewBikePhotoController);

app.patch("/api/bikes/:id", patchBikeController);

app.all("*", handleWrongPathErrors);
app.use(handleBadRequestError);
app.use(handleCustomErrors);
app.use(handle500Errors);
module.exports = app;

app.listen(9090, () => console.log("Server running on port 9090"));
