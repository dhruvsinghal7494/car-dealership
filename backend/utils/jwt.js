import jwt from "jsonwebtoken";

const invalidatedTokens = [];

const addInvalidatedToken = async (token) => {
  invalidatedTokens.push(token);
};

const isTokenInvalidated = async (token) => {
  return invalidatedTokens.includes(token);
};

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access token required");
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err || (await isTokenInvalidated(token))) {
      return res.status(403).send("Invalid or expired token");
    }

    req.user = user;
    next();
  });
};

export { addInvalidatedToken, authenticateJWT };
