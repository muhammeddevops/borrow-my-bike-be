const handleWrongPathErrors = (request, response, next) => {
  response.status(404).send({ msg: "Path not found" });
};

const handleCustomErrors = (error, request, response, next) => {
  if (error.status === 404) {
    response.status(404).send({ msg: "Path not found" });
  } else {
    next(error);
  }
};

const handleBadRequestError = (error, request, response, next) => {
  if (error.name === "ValidationError" || error.status === 400) {
    response.status(400).send({ msg: "Bad request" });
  } else {
    next(error);
  }
};

const handle500Errors = (error, request, response, next) => {
  response.status(500).send({ msg: "There has been a server error!" });
};

module.exports = {
  handleCustomErrors,
  handleWrongPathErrors,
  handle500Errors,
  handleBadRequestError,
};
