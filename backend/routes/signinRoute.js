import signinController from "../controllers/index.js";
import { Router } from "express";

const signinRouter = Router();

signinRouter.post(
  "/sign-in",
  signinController.signinControllers.signinController
);

export default signinRouter;
