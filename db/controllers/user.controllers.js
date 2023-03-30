const userModel = require("../models/user.models");
const bcryptJs = require("bcryptjs");

exports.postNewUserController = (req, res, next) => {
  const hashedPassword = bcryptJs.hashSync(req.body.password, 10);

  const newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
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
};

exports.getUserInfoController = (req, res) => {
  const { id } = req.params;
  userModel
    .find({ _id: id })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.status(500).send("error");
    });
};

exports.getAllUsersController = (req, res) => {
  userModel
    .find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).send("error");
    });
};

exports.loginUserController = (req, res, next) => {
  const userObj = { ...req.user };
  res.status(200).send({ user: userObj });
};
