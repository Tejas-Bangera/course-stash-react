const jwt = require("jsonwebtoken");

function validateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, `${process.env.SECRET_KEY}`, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;
      next();
    });
  } else {
    return res.sendStatus(401);
  }
}

module.exports = {
  validateJWT,
};
