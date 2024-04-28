import signupController from "../controllers/index.js";
import { Router } from "express";

const signupRoute = Router();

signupRoute.post(
  "/sign-up",
  signupController.signupControllers.signupController
);

export default signupRoute;
