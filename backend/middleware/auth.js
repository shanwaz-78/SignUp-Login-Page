import jwt from "jsonwebtoken";
const SECRECT_kEY = process.env.SECRET_KEY;

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      const verifiedUser = jwt.verify(token, SECRECT_kEY);
      req.userId = verifiedUser.id;
    } else {
      res.status(401).send({ message: `Unauthorized User` });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: `Unauthorized User` });
  }
};

export default auth;
