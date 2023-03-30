const userModel = require("../models/user.models");

exports.postNewUser = (body, hashedPassword) => {
  const newUser = new userModel({
    username: body.username,
    email: body.email,
    password: hashedPassword,
    credit_amount: body.credit_amount,
    avatar_img_url: body.avatar_img_url,
  });
  return newUser.save().then((newUser) => {
    return newUser;
  });
};

exports.fetchUserById = (id) => {
  return userModel.find({ _id: id }).then((user) => {
    if (user.length === 0) {
      return Promise.reject({ status: 404 });
    } else {
      return user;
    }
  });
};

exports.fetchAllUsers = () => {
  return userModel.find({}).then((users) => {
    return users;
  });
};
