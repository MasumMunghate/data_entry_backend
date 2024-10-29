const {
  createnewUser,
  retriveAllUser,
  stapminfoRecive,
} = require("../services/registeruser.services");

const registerUser = async (req, res) => {
  try {
    const user = await createnewUser(req);
    if (!user) {
      res.status(400).send({ message: "User not created !" });
      return;
    }
    res.status(200).send({ message: "New user successfully created !" });
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
    res.status(200).send({ message: "All User" });
    return;
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log("error", error);
  }
};

const stampInfomation = async (req, res) => {
  // console.log(req.files, "Uploaded files"); got the both file
  const result = await stapminfoRecive(req);
  if (!result) {
    res.status(400).json({ message: "Images not uplodes" });
    return;
  }
  console.log(result, "result"); // i got undefine here
  res.status(200).json({ message: "image uplode" });
  return;
};

module.exports = { registerUser, allregisteruser, stampInfomation };
