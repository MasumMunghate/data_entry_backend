const db = require("../models");
const nodemailer = require("nodemailer");
const cloudinary = require('cloudinary').v2;
const upload = require('../config/multer.config');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, 
  auth: {
    user: "nigel.mohr57@ethereal.email",
    pass: "BYZGZXh7sgJmwZzr1V",
  },
});
async function sendMailToRegisterUser(name , email){
  let info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <nigel.mohr57@ethereal.email>', 
    to: email, 
    subject: "Hello ✔", 
    text: `hii ${name}`, 
    html: "<b>Hello world?</b>",
  })
  console.log("Message sent: %s", info.messageId);
}


const createnewUser = async (req) => {
  const { name, email, address, mobile_number, plan, caller } = req.body;
  try {
    const newUser = await db.registeruser.create({
      name,
      email,
      address,
      mobile_number,
      plan,
      caller,
    });
    await sendMailToRegisterUser(name, email);
    return newUser;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

const retriveAllUser = async (req) => {
  try {
    const alluser = await db.registeruser.findAll();
    return alluser;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

const stapminfoRecive = async (req) => {
  console.log(req.file);
  try {
    if (!req.file) {
      throw new Error("No file uploaded.");
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Imges",
      use_filename: true,
      unique_filename: false,
    });
    await StampInfo.create({
      email: req.body.email,
      start_date: req.body.start_date,
      signature: req.body.signature,
      passport_photo: result.secure_url,
    });
    return { imageUrl: result.secure_url, imageId: result.public_id };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};


module.exports = { createnewUser, retriveAllUser,stapminfoRecive };
