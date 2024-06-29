const userAuthHelper = require("../../helpers/user/user.authHelper");
const {
  hashPassword,
  generateToken,
  comparePassword,
} = require("../../utils/auth.jwt");
const { signupHelper, singinHelper } = userAuthHelper();

const userController = () => {
  const userSignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        console.log("data get",req?.body);
      const existingUser = await singinHelper(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await hashPassword(password);
      req.body.password = hashedPassword;
      const user = await signupHelper(req?.body);

      const token = generateToken(user);

      res.status(201).json({ token ,_id:user?._id});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const userSignin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await singinHelper(email);

      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isMatch = await comparePassword(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = generateToken(user);

      res.status(200).json({ token,_id:user?._id });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  return {
    userSignup,
    userSignin,
  };
};
module.exports = userController;
