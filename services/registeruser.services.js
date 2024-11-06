const db = require("../models");
const nodemailer = require("nodemailer");
const fs = require("fs");
const cloudinary = require("../config/cloudinaryConfig");
const { where } = require("sequelize");
// console.log(cloudinary.config());

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "jaron.stehr45@ethereal.email",
    pass: "nVZQmC4BETKTSM4wwY",
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
  const { email, start_date } = req.body;
  const { passport_photo, signature } = req.files;

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
      passport_photo: passportPhotoRes.secure_url,
    });

    return newRecord;
  } catch (error) {
    throw new Error(error.message);
  }
};
async function cloudinaryfun(fileBuffer) {
  // console.log(fileBuffer,"filebuffer");
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "Images" },
      (error, result) => {
        if (error) {
          console.log(error, "detaild error");
          reject(new Error("Upload to Cloudinary failed"));
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
}

const deleteUserByID = async (req) => {
  try {
    const userId = req.params.id;
    const deleteUser = db.registeruser.destroy({
      where: {
        id: userId,
      },
    });
    return deleteUser;
  } catch (error) {
    console.error(error, "Error");
    throw error;
  }
};

const editUser = async (req) => {
  try {
    const userId = req.params.id;
    const {
      name,
      email,
      mobile_number,
      address,
      start_date,
      end_date,
      plan,
      caller,
    } = req.body;
    const updateUser = db.registeruser.update(
      {
        name: name,
        email: email,
        mobile_number: mobile_number,
        address: address,
        start_date: start_date,
        end_date: end_date,
        plan: plan,
        caller: caller,
      },
      {
        where: { id: userId },
      }
    );
    return updateUser;
  } catch (error) {
    throw error;
  }
};

// const transportersecond = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   logger : true,
//   debug : true,
//   secure: true, // true for port 465, false for other ports
//   secureConnection : false,
//   auth: {
//     user: "raghavmunghae@gmail.com",
//     // pass: "illm vfyl nfpo alnq",
//     pass: "cyzp pkuj faxa mqic",
    
//   },
//   tls:{
//     rejectUnauthorized : true
//   }
// });
// const sendEmail = async (req) => {
//   const mailOption = {
//     from: {
//       name: "Glorry Enterprises",
//       address: "raghavmunghate@gmail.com",
//     },
//     to: "masummunghate30199@gmail.com", 
//     subject: "Hello ✔", 
//     text: "Hello world?", 
//     html: "<b>Hello world?</b>",
//   };
//   try {
//     const info = await transportersecond.sendMail(mailOption);
//     console.log("Email sent: " + info.req);
//   } catch (error) {
//     console.error("Error sending email: ", error);
//   }
// };
// sendEmail();
// =========================

// const { google } = require("googleapis");
// // Configure OAuth2
// const CLIENT_ID = "62415729904-fdpus7l254ctt16531adlg2ehom2ruef.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN = "your-refresh-token";

// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// const sendEmail = async () => {
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "raghavmunghae@gmail.com",
//         clientId: CLIENT_ID,
//         clientSecret: CLIENT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accessToken,
//       },
//     });

//     const mailOptions = {
//       from: "Your Name <your-email@gmail.com>",
//       to: "masummunghate30199@gmail.com",
//       subject: "Hello with OAuth2",
//       text: "Hello world!",
//       html: "<b>Hello world!</b>",
//     };
//     const result = await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully:", result);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };


module.exports = {
  createnewUser,
  retriveAllUser,
  stapminfoRecive,
  deleteUserByID,
  editUser,
  // sendEmail,
};
