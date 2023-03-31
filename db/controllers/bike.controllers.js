const fs = require("fs");
const {
  fetchBikeById,
  postNewBike,
  fetchAllBikes,
  postNewBikePhoto,
  updateBike,
} = require("../models/bike.queries.models");

exports.postNewBikeController = (req, res, next) => {
  postNewBike(req.body)
    .then((savedBike) => {
      res.status(201).json(savedBike);
    })
    .catch((error) => {
      next(error);
    });
};

exports.getBikeByIdController = (req, res, next) => {
  const { id } = req.params;
  fetchBikeById(id)
    .then((bike) => {
      res.status(200).json(bike);
    })
    .catch((error) => {
      next(error);
    });
};

exports.getAllBikesController = (req, res, next) => {
  fetchAllBikes()
    .then((bikes) => {
      res.status(200).json(bikes);
    })
    .catch((error) => {
      next(error);
    });
};

exports.postNewBikePhotoController = (req, res, next) => {
  const file = req.file;
  postNewBikePhoto(file).then((url) => {
    res.status(201).send(url);
  });
};

exports.patchBikeController = (req, res, next) => {
  const { id } = req.params;
  const { rented_by, is_available } = req.body;
  updateBike(id, rented_by, is_available)
    .then((updatedBike) => {
      res.status(201).send(updatedBike);
    })
    .catch((error) => {
      next(error);
    });
};
