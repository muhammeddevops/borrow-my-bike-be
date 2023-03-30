const bikeModel = require("../models/bike.models");
const bcryptJs = require("bcryptjs");
const fs = require("fs");
const multer = require("multer");
const Dropbox = require("dropbox").Dropbox;

const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const upload = multer({ dest: "uploads/" });

const dbaccesstoken =
  "sl.Bbd7v1PCF-bXWDNorl_KGizifU7wsPrqTy9XiY4uf_5Cc6m6VjBJ7sFBBJAJc753kKIYs8kmwCtxd3gceas0VoQbMVOgABwaJtdXd-FvTfIPVR4sPAwOfZ-x0OYKC0C88GOGa19X";

const dbx = new Dropbox({ accessToken: dbaccesstoken });

exports.postNewBikeController = (req, res, next) => {
  const newBike = new bikeModel({
    bike_owner: req.body.bike_owner,
    rented_by: req.body.rented_by,
    type: req.body.type,
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
    .catch(next);
};

exports.getBikeByIdController = (req, res, next) => {
  const { id } = req.params;
  bikeModel
    .find({ _id: id })
    .then((bike) => {
      res.json(bike);
    })
    .catch(next);
};

exports.getAllBikesController = (req, res, next) => {
  bikeModel
    .find({})
    .then((bikes) => {
      res.status(200).json(bikes);
    })
    .catch(next);
};

exports.postNewBikePhotoController = (req, res, next) => {
  const file = req.file;

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
          });
      });
  });
};
