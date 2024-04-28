import crypto from "crypto";
import userModel from "../models/user.js";
import { checkData } from "../util/globalUtil.js";
import { generateToken } from "../util/jwtUtil.js";

const signinService = async (data, res) => {
  try {
    const { email, password } = data;
    const userCredentials = await checkData(userModel, email);
    if (!userCredentials) {
      return res.status(404).send({ message: `User Not Found` });
    }
    const encryptionInstance = crypto.createHash("sha256").update(password);
    const hashedPassword = encryptionInstance.digest("hex");

    if (hashedPassword !== userCredentials.password) {
      return res.status(400).send({ message: `Invalid Credentials` });
    }

    const token = generateToken({
      email: userCredentials.email,
      id: userCredentials._id,
    });

    return res.status(200).json({ user: userCredentials, token: token });
  } catch (error) {
    console.log(`SignIn Error:`, error);
    return res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

export default { signinService };
