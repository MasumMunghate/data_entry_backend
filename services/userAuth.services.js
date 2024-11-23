const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const db = require('../models')
dotenv.config();

function generetToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_TIME,
  });
}

const authUser = async (req) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const findEmail = await db.registeruser.findOne({ where: { email } });
    if (!findEmail || !(await bcrypt.compare(password, findEmail.password))) {
      throw new Error("Incorrect email or password");
    }
    const token = generetToken({ id: findEmail.id });
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = authUser;
