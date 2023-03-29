const handleWrongPathErrors = (request, response, next) => {
  const error = new Error("Path not found");
  error.status = 404;
  if (error.status === 404) {
    response.status(404).send({ msg: "Path not found" });
  } else {
    next(error);
  }
};

const handleBadRequestError = (error, request, response, next) => {
  console.log(error, "i'm in bad request");
  if (error.name === "ValidationError") {
    response.status(400).send({ msg: "Bad request" });
  } else {
    next(error);
  }
};

const handle500Errors = (error, request, response, next) => {
  console.log(error, "i'm in 500");
  response.status(500).send({ msg: "There has been a server error!" });
};

module.exports = {
  handleWrongPathErrors,
  handle500Errors,
  handleBadRequestError,
};
