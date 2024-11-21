const db = require("../models");
const nodemailer = require("nodemailer");
const fs = require("fs");
const cloudinary = require("../config/cloudinaryConfig");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  logger: true,
  debug: true,
  secure: false,
  secureConnection: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
});
async function sendMailToRegisterUser(name, email, userid) {
  let info = await transporter.sendMail({
    from: "process.env.EMAIL_FROM",
    to: email,
    subject: "Registration Confirmation - Glorry Enterprises",
    text: `hii ${name}`,
    html: `Dear User, <br> Thank you for choosing GLorry Enterprises. "Link which redirect to stamp paper section" Link:https://tacottr.ptcare.in?userid=${userid} `,
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

    await sendMailToRegisterUser(name, email, newUser.id);
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

// logic with 5 day working status success
const stapminfoRecive = async (req) => {
  const { email, start_date, userid } = req.body;
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
    const date = new Date(start_date);
    console.log(date, "Currect date");
    date.setDate(date.getDate() + 5);
    console.log(date, "UpdateDate");
    const newRecord = await db.stampInfo.create({
      userid: userid,
      email: email,
      start_date: start_date,
      end_date: date,
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

const transportersecond = nodemailer.createTransport({
  service: "gmail",
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  logger: true,
  debug: true,
  secure: false,
  secureConnection: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
});
const mailOption = {
  from: {
    name: "Glorry Enterprises",
    address: process.env.EMAIL_FROM,
  },
  subject: "Welcome to glorry Enterprices",
  // to: masummunghate30199@gmail.com
  // text: `Hello world? userdi:`,
  // html: "<b> world?</b>",
};
const sendEmail = async (req) => {
  const userId = req.params.id;
  try {
    const useremail = await db.registeruser.findOne({
      where: { id: userId },
      attributes: ["email"],
    });
    await db.registeruser.update({
      where: { status: "success" },
    });
    const dbEmail = useremail ? useremail.email : null;
    mailOption.to = dbEmail;
    const userpassword = generatePassword();
    const hashedPassword = await bcrypt(userpassword, 10);
    const newPassword = await db.registeruser.update(
      { password: hashedPassword },
      { where: { id: userId } }
    );
    mailOption.html = `Hello your user name ${dbEmail} and password is <strong>${userpassword}</strong>`;
    const info = await transportersecond.sendMail(mailOption);
    console.log("Email sent: " + info.req);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
function generatePassword() {
  const createPassword =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i <= 6; i++) {
    const index = Math.floor(Math.random() * createPassword.length);
    password += createPassword[index];
  }
  return password;
}

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

const allUserWithPaggination = async (req) => {
  try {
    const defaultPage = 1;
    const defaultLimit = 10;
    const { page = defaultPage, limit = defaultLimit } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      pageNumber < 1 ||
      limitNumber < 1
    ) {
      throw Error("Invalid page or limit values.");
    }
    const totalUsers = await db.registeruser.count();
    const totalPages = Math.ceil(totalUsers / limitNumber);
    if (pageNumber > totalPages) {
      throw Error("Invalid page number.");
    }
    const offset = (pageNumber - 1) * limitNumber;

    const alluser = await db.registeruser.findAll({
      limit: limitNumber,
      offset: offset,
    });

    return {
      alluser,
      currentPage: pageNumber,
      totalPages,
      totalUsers,
    };
  } catch (error) {
    throw error;
  }
};

const allStampData = async (req) => {
  try {
    const data = await db.stampInfo.findAll();
    return data;
  } catch (error) {
    throw error;
  }
};

const getStampDataById = (req) => {
  const stampId = req.params.id;
  try {
    const stampDataId = db.stampInfo.findOne({
      where: { id: stampId },
    });
    return stampDataId;
  } catch (error) {
    throw error;
  }
};
const userSingleValue = async (req) => {
  try {
    const alluserdata = await db.registeruser.count({
      where: {
        status: "pending",
      },
    });
    return alluserdata;
  } catch (error) {
    throw error;
  }
};

const assingmentSubmitionServices = async (req) => {
  try {
    
  } catch (error) {
    console.log(error,"Error");
    
  }
};
module.exports = {
  createnewUser,
  retriveAllUser,
  stapminfoRecive,
  deleteUserByID,
  editUser,
  sendEmail,
  allUserWithPaggination,
  allStampData,
  getStampDataById,
  userSingleValue,
  assingmentSubmitionServices
};
