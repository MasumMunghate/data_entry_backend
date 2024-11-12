const authUser = require("../services/userAuth.services");

const userLogin = async (req, res) => {
  try {
    const login = await authUser(req);
    if (!login) {
      return res.status(400).send({message: "unauthorised user"});
    }
    return res.status(200).send({message:"User successfully login"});
  } catch (error) {
    throw error
  }
};

module.exports = userLogin;
