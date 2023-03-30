const userModel = require("../models/user.models");
const bcryptJs = require("bcryptjs");
const {
  postNewUser,
  fetchUserById,
  fetchAllUsers,
} = require("../models/user.queries.models");

exports.postNewUserController = (req, res, next) => {
  const hashedPassword = bcryptJs.hashSync(req.body.password, 10);
  postNewUser(req.body, hashedPassword)
    .then((savedUser) => {
      res.status(201).json(savedUser);
    })
    .catch((error) => {
      next(error);
    });
};

exports.getUserInfoController = (req, res) => {
  const { id } = req.params;
  fetchUserById(id)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      next(error);
    });
};

exports.getAllUsersController = (req, res) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      next(error);
    });
};

exports.loginUserController = (req, res, next) => {
  const userObj = { ...req.user };
  res.status(200).send({ user: userObj });
};
