const insertData = async (userModel, userData) => {
  try {
    console.log(userData);
    const createdUser = await userModel.create(userData);
    return createdUser;
  } catch (error) {
    console.log(`Inserted Error`, error)
    throw new Error(error);
  }
};

const checkData = async (userModel, user) => {
  try {
    const isUserExists = await userModel.findOne({ email: user });
    return isUserExists;
  } catch (error) {
    console.log(`checkData Error`, error)
    throw new Error(error);
  }
};

export { checkData, insertData };
