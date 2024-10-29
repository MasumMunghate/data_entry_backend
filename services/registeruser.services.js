const db = require("../models");
const nodemailer = require("nodemailer");
const fs = require("fs");
const cloudinary  = require("../config/cloudinaryConfig");
// console.log(cloudinary.config());

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "nigel.mohr57@ethereal.email",
    pass: "BYZGZXh7sgJmwZzr1V",
  },
});
async function sendMailToRegisterUser(name, email) {
  let info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <nigel.mohr57@ethereal.email>',
    to: email,
    subject: "Hello ✔",
    text: `hii ${name}`,
    html: "<b>Hello world?</b>",
  });
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
  const {email, start_date} = req.body;
  const {passport_photo, signature} = req.files;
  
  try {
    if (!passport_photo || !signature) {
      throw new Error("Files `passport_photo` or `signature` are missing");
    }
    const passportPhotoRes = await cloudinaryfun(passport_photo[0].buffer);
    const signatureRes = await cloudinaryfun(signature[0].buffer);
    if (!passportPhotoRes.secure_url || !signatureRes.secure_url) {
      throw new Error("Upload to Cloudinary failed for one or more files");
    }
    if (!signatureRes || !signatureRes.secure_url) {
      throw new Error("Signature upload to Cloudinary failed");
    }
    const newRecord = await db.stampInfo.create({
      email: email,
      start_date: start_date,
      signature: signatureRes.secure_url,
      passport_photo: passportPhotoRes.secure_url
    });

    return newRecord;
  
  } catch (error) {
    throw new Error(error.message);
  }

};
async function cloudinaryfun(fileBuffer) {
  console.log(fileBuffer,"filebuffer");
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'Images' },
      (error, result) => {
        if (error) {
          console.log(error,"detaild error");
          reject(new Error('Upload to Cloudinary failed'));
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
}



module.exports = { createnewUser, retriveAllUser, stapminfoRecive };
