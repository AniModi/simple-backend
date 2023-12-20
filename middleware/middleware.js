const jwt = require("jsonwebtoken");

async function checkToken(req, res, next) {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
      return res.status(401).json({
        auth: false,
        message: "No token provided.",
      });
    }

    const token = authorizationHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(500).json({
          auth: false,
          message: "Failed to authenticate token.",
        });
      }

      res.status(200).json({
        auth: true,
        message: "Token is valid.",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({error : err});
  }
}

module.exports = { checkToken };
