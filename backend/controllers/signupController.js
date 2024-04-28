import services from "../services/index.js";

const signupController = (req, res) => {
  let dataObj;
  const { name, email, password } = (dataObj = req.body);
  services.signupServices.signUpService(dataObj, res);
};

export default { signupController };
