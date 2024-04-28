import services from "../services/index.js";

const signinController = (req, res) => {
  let dataObj;
  const { email, password } = (dataObj = req.body);
  services.signinServices.signinService(dataObj, res);
};

export default { signinController };
