const jwt = require("jsonwebtoken");
const config = require("config");
const key = config.get("JwtKey");

const auth = (req, res, next) => {
  const tkn = req.headers["x-auth-token"];

  if (!tkn) {
    console.log("no token found ");
    return res.status(401).json({ msg: "No token auth denied" });
  }

  try {
    const decode = jwt.verify(tkn, key);
    req.user = decode.user;
    next();
  } catch (err) {
    console.log("err in verification ");
    return res.status(401).json({ msg: "token is not valid " });
  }
};

module.exports = auth;
