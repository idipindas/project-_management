const userModel = require("../../models/user.model");

const userAuthHelper = () => {
  const singinHelper = async (email) => {
    try {
      const user = await userModel.findOne({ email: email });
      return user;
    } catch (error) {
      throw error;
    }
  };

  const signupHelper = async (data) => {
    try {
      const user = new userModel(data);
      await user.save();
      return user;
    } catch (Error) {
      throw Error;
    }
  };
  return {
    singinHelper,
    signupHelper,
  };
};
module.exports = userAuthHelper;
