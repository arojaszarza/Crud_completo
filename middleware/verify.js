const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify = (req, res, next) => {
  console.log(req.headers);

  if (!req.headers.authorization) {
    return res.send("no viene token");
  }

  //   Bearer jfoiwfew0fie.jfoewjfwofew.mocejovwofe
  const header = req.headers.authorization;
  const token = header.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (error, result) => {
    if (error) {
      return res.send("el token no es válido");
    }
    console.log(result);
    next();
  });
};

module.exports = verify;