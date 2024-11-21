const {
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
  assingmentSubmitionServices,
} = require("../services/registeruser.services");
const db = require("../models");

const { registeruser, stampInfo } = require("../models");
const { Model, where } = require("sequelize");
const post = require("../models/post.model");

const registerUser = async (req, res) => {
  try {
    const user = await createnewUser(req);
    if (!user) {
      res.status(400).send({ message: "User not created !" });
      return;
    }
    res.status(200).send({ message: "New user successfully created !", user });
    return;
  } catch (error) {
    res.status(500).send({ message: "Internal server error!" });
    return;
  }
};

const allregisteruser = async (req, res) => {
  try {
    const alluser = await retriveAllUser(req);
    if (!alluser) {
      res.status(400).send({ message: "No user Found !" });
      return;
    }
    res.status(200).send({ message: "All User", alluser });
    return;
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log("error", error);
  }
};
const stampInfomation = async (req, res) => {
  try {
    const result = await stapminfoRecive(req);
    if (!result) {
      res.status(400).json({ message: "Images not uplodes" });
      return;
    }
    console.log(result, "result");
    res.status(200).json({ message: "image uplode", result });
    return;
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.error("Error", error);
  }
};

const getAllUser = async (req, res) => {
  try {
    // Find All ono-to-one relation
    const data = await registeruser.findAll({
      include: [
        {
          model: stampInfo,
          as: "stampInfo",
        },
      ],
    });
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error("Error", error);
  }
};

const singleUserById = async (req, res) => {
  try {
    const user_id = req.params.id;
    const findRegisterId = await db.registeruser.findOne({
      where: { id: userid },
    });
    const randompassword = generatePassword();
    console.log(randompassword, "randompassword==========");

    if (!findRegisterId) {
      return res.status(400).send({ message: "user not found" });
    }
    const userName = findRegisterId.email;
    console.log(userName, "userName=============");
    return res.status(200).send({
      message: "user successful retrive",
      findRegisterId,
      randompassword,
      userName,
    });
  } catch (error) {
    console.error(error, "error");
    return res
      .status(500)
      .send({ message: "Server error", error: error.message });
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
const getStampbyId = async (req, res) => {
  try {
    const stamp_id = req.query.id;
    const data = await db.stampInfo.findOne({
      where: { id: stamp_id },
      include: [{model: registeruser, as: "registeruser"}],
    });
    
    if (!data) {
      return res.status(400).send({ message: "user not found" });
    }
    const updateStatus =await db.registeruser.update(
     {status : "success"},
     {where : {id : data.registeruser.id}}
    )
    return res.status(200).send({
      message: "user successful retrive",
      data
    });
  } catch (error) {
    console.error(error, "error");
    return res
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
};
// const createUserWithPosts = async (req, res) => {
//   try {
//     const { name, email, posts } = req.body;
//     const user = await db.user_relation.create(
//       { name, email, posts },
//       { include: [{ model: post, as: "posts" }] }
//     );
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getUserWithPosts = async (req, res) => {
//   try {
//     const user = await db.user_relation.findOne({
//       where: { id: req.params.id },
//       include: [{ model: post, as: "posts" }],
//     });
//     if (!user) return res.status(404).json({ error: "User not found" });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const deleteuser = async (req, res) => {
  try {
    const user = await deleteUserByID(req);
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    return res.status(200).send({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.error("Error", error);
  }
};

const editregisterUser = async (req, res) => {
  try {
    const user = await editUser(req);
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    return res.status(200).send({ message: "User edit successfully", user });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.error("Error", error);
  }
};
const secondEmailSend = async (req, res) => {
  try {
    const email = await sendEmail(req);
    return res.status(200).send({ message: "Email send successfully", email });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.error("Error", error);
  }
};

const userPaggination = async (req, res) => {
  try {
    const alluser = await allUserWithPaggination(req);
    if (!alluser) {
      return res.status(400).send({ message: "no user found" });
    }
    return res
      .status(200)
      .send({ message: "all User with paggination", alluser });
  } catch (error) {
    console.log("Error", error);
  }
};

const stampData = async (req, res) => {
  try {
    const stamp = await allStampData(req);
    if (!stamp) {
      return res.status(400).send({ message: "No stamp data Available" });
    }
    return res.status(200).send({ message: "All Stamp data", stamp });
  } catch (error) {
    throw error;
  }
};
const stampDataById = async (req, res) => {
  try {
    const stampId = await getStampDataById(req);
    if (!stampId) {
      return res.status(400).send({ message: "Details not found" });
    }
    return res.status(200).send({ message: "Data by Perticular id", stampId });
  } catch (error) {
    throw error;
  }
};

const getAllValue = async (req, res) => {
  try {
    const userdata = await userSingleValue(req);
    if (!userdata) {
      return res.status(400).send({ message: "no user" });
    }
    return res.status(200).send({ message: "all user", userdata });
  } catch (error) {
    throw error;
  }
};

const assingmentSubmition = async(req, res)=>{
  try {
    const result = await assingmentSubmitionServices(req)
    if(result){
      res.status(400).send({message:"No assingment form"});
    }
    res.status(400).send({message:"data fetch successfully", data:result});
  } catch (error) {
    
  }
}
module.exports = {
  registerUser,
  allregisteruser,
  stampInfomation,
  singleUserById,
  getAllUser,
  deleteuser,
  editregisterUser,
  secondEmailSend,
  userPaggination,
  stampData,
  stampDataById,
  getAllValue,
  getStampbyId,
  assingmentSubmition
};
