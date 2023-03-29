const handleWrongPathErrors = (request, response, next) => {
  response.status(404).send({ msg: "Path not found" });
};

const handle500Errors = (error, request, response, next) => {
  response.status(500).send({ msg: "There has been a server error!" });
};

module.exports = { handleWrongPathErrors, handle500Errors };
