const { bikeModel, reviewModel } = require("../models/bike.models");
const fs = require("fs");
const multer = require("multer");
const { db } = require("../models/bike.models");
const Dropbox = require("dropbox").Dropbox;

const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const upload = multer({ dest: "uploads/" });

const dbaccesstoken =
  "sl.Bbd7v1PCF-bXWDNorl_KGizifU7wsPrqTy9XiY4uf_5Cc6m6VjBJ7sFBBJAJc753kKIYs8kmwCtxd3gceas0VoQbMVOgABwaJtdXd-FvTfIPVR4sPAwOfZ-x0OYKC0C88GOGa19X";

const dbx = new Dropbox({ accessToken: dbaccesstoken });

exports.fetchBikeById = (id) => {
  return bikeModel.find({ _id: id }).then((bike) => {
    if (bike.length === 0) {
      return Promise.reject({ status: 404 });
    } else {
      return bike;
    }
  });
};

exports.postNewBike = (body) => {
  const newBike = new bikeModel({
    bike_owner: body.bike_owner,
    rented_by: body.rented_by,
    type: body.type,
    location: body.location,
    time_available: body.time_available,
    price: body.price,
    description: body.description,
    qr_url: body.qr_url,
    bike_image_url: body.bike_image_url,
  });

  return newBike.save().then((savedBike) => {
    return savedBike;
  });
};

exports.fetchAllBikes = () => {
  return bikeModel.find({}).then((bikes) => {
    return bikes;
  });
};

exports.postNewBikePhoto = (file) => {
  fs.readFile(file.path, (err, contents) => {
    if (err)
      return Promise.reject({ msg: "Failed to post a photo to dropbox" });
    dbx
      .filesUpload({ path: `/${file.originalname}`, contents: contents })
      .then(() => {
        const link = dbx
          .sharingCreateSharedLinkWithSettings({
            path: "/" + file.originalname,
          })
          .then((link) => {
            const imageUrl = link?.result?.url?.replace("dl=0", "raw=1");
            return imageUrl;
          });
      });
  });
};

exports.updateBike = (id, rented_by) => {
  return bikeModel
    .updateOne({ _id: id }, { $set: { rented_by: rented_by } })
    .then((updateBike) => {
      console.log(updateBike);
      if (updateBike.matchedCount === 0) {
        return Promise.reject({ status: 404 });
      } else {
        return updateBike;
      }
    });
};

exports.addReview = (body) => {
  const newReview = new reviewModel({
    review_title: body.review_title,
    review_body: body.review_body,
    user: body.user,
  });

  return newReview
    .save()
    .then((savedReview) => savedReview)
    .catch((err) => console.log(err));
};
