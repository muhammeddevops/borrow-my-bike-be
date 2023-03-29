const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Dropbox = require("dropbox").Dropbox;
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const auth = require("./server/route/aouth.js");
const passport = require("passport");

const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const upload = multer({ dest: "uploads/" });

const dbaccesstoken =
  "sl.Bbd7v1PCF-bXWDNorl_KGizifU7wsPrqTy9XiY4uf_5Cc6m6VjBJ7sFBBJAJc753kKIYs8kmwCtxd3gceas0VoQbMVOgABwaJtdXd-FvTfIPVR4sPAwOfZ-x0OYKC0C88GOGa19X";

const dbx = new Dropbox({ accessToken: dbaccesstoken });

const app = express();

const connStr =
  "mongodb+srv://thereactorsmcr:Northcoders123@cluster1.nhdvvfk.mongodb.net/development";

// connect to my MongoDB database
mongoose
  .connect(connStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(`Error connecting to database: ${error}`));

// Allow all requests from any domain
app.use(cors());

// set up middleware
app.use(express.json());

//storring session
app.use(
  session({
    secret: "test_secret",
    resave: false,
    saveUninitalized: true,
    store: MongoStore.create({ mongoUrl: connStr }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", auth);

// Define the schema for the users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  linked_bike_id: {
    type: String,
  },
  credit_amount: {
    type: Number,
  },
  avatar_img_url: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

// Define the schema for the bikes
const bikeSchema = new mongoose.Schema({
  bike_owner: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  rented_by: {
    type: String,
  },
  bike_type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  time_available: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  qr_url: {
    type: String,
    required: true,
  },
  bike_image_url: {
    type: String,
    required: false,
  },
});

const Bike = mongoose.model("Bike", bikeSchema);

app.post("/api/user", (req, res) => {
  console.log(req);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    linked_bike_id: req.body.linked_bike_id,
    credit_amount: req.body.credit_amount,
    avatar_img_url: req.body.avatar_img_url,
  });

  newUser
    .save()
    .then((savedUser) => {
      res.status(201).json(savedUser);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  User.find({ _id: id })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("error");
    });
});

app.get("/api/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("error");
    });
});

app.post("/api/bike", (req, res) => {
  const newBike = new Bike({
    bike_owner: req.body.bike_owner,
    bike_type: req.body.bike_type,
    location: req.body.location,
    time_available: req.body.time_available,
    price: req.body.price,
    description: req.body.description,
    qr_url: req.body.qr_url,
    bike_image_url: req.body.bike_image_url,
  });

  newBike
    .save()
    .then((savedBike) => {
      res.status(201).json(savedBike);
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
});

app.get("/api/bikes", (req, res) => {
  Bike.find({})
    .then((bikes) => {
      res.json(bikes);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(err);
    });
});

app.get("/api/bikes/:id", (req, res) => {
  const { id } = req.params;

  Bike.find({ _id: id })
    .then((bike) => {
      res.json(bike);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(err);
    });
});

app.post("/api/bikephoto", upload.single("file"), (req, res) => {
  const file = req.file;
  console.log(file);

  fs.readFile(file.path, (err, contents) => {
    if (err) return res.status(500).send(err);
    dbx
      .filesUpload({ path: `/${file.originalname}`, contents: contents })
      .then(() => {
        const link = dbx
          .sharingCreateSharedLinkWithSettings({
            path: "/" + file.originalname,
          })
          .then((link) => {
            const imageUrl = link?.result?.url?.replace("dl=0", "raw=1");
            console.log(imageUrl);
          });
      });
  });
});

app.listen(9090, () => console.log("Server running on port 9090"));

//  user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },

module.exports = { User };
