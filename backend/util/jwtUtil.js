import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

function generateToken(payload) {
  const token = jwt.sign(payload, secretKey);
  return token;
}

export { generateToken };
