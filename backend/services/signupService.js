import crypto from "crypto";
import userModel from "../models/user.js";
import mongoose from "mongoose";
import { checkData, insertData } from "../util/globalUtil.js";
import { generateToken } from "../util/jwtUtil.js";

const signUpService = async (data, res) => {
  try {
    const { name, email, password } = data;
    const isUserExists = await checkData(userModel, email);
    if (isUserExists) {
      return res.status(400).send({ message: `User Already Exists` });
    }

    const encryptionInstance = crypto.createHash("sha256").update(password);
    const hashedPassword = encryptionInstance.digest("hex");

    const createdUser = await insertData(userModel, {
      name: name,
      email: email,
      password: hashedPassword,
    });

    console.log(`Created User:`, createdUser);

    const token = generateToken({
      email: createdUser.email,
      id: createdUser._id,
    });

    return res.status(201).json({ user: createdUser, token: token });
  } catch (error) {
    console.log(`Signup Error:`, error);
    return res
      .status(500)
      .json({ message: `Internel Server Error: ${error.message}` });
  } finally {
    if (mongoose.connection) {
      mongoose.connection.close();
    }
  }
};

export default { signUpService };
