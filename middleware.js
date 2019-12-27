const jwt = require("jsonwebtoken");
const secretKey = "thisismysecretkey"

//authentication
//validating your credentials like User Name/User ID and password to verify your identity.
exports.authenticated = (req, res, next) => {
  let tokenHeader = req.headers["authorization"];
  let token = tokenHeader.slice(7, tokenHeader.length);
  //check for token
  if (token == null) {
    res.status(401).send({ 
      message: "Unauthorized" 
    });
  }else{
    jwt.verify(token, secretKey, (err, decode) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "token is not valid"
        });
      } else {
        req.user_id = decode.id;
        next();
      }
    });
  }
};

//authorization
//on the other hand, occurs after your identity is successfully authenticated by the system, which ultimately gives you full permission to access the resources
exports.authorized = (req, res, next) => {
  let tokenHeader = req.headers["authorization"];

  if (!tokenHeader) {
    return res.status(403).json({
      msg: "Token is not defined"
    });
  }

  let token = tokenHeader.slice(7, tokenHeader.length);

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          msg: "Token is not valid"
        });
      }

      if (req.params.author_id != decoded.id) {
        return res.status(401).json({
          msg: "You are not authorized"
        });
      }

      next();
    });
  }
};
