const {createnewUser,retriveAllUser, stapminfoRecive} = require("../services/registeruser.services");

const registerUser = async(req, res) => {
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

const allregisteruser =async (req, res) => {
  try {
    const alluser =await retriveAllUser(req);
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

const stampInfomation = async(req, res)=>{
  try {
    const stapminfo =await stapminfoRecive(req);
    if(!stapminfo){
      res.status(400).send({message:"No User found !"});
      return;
    }
    res.status(200).send({message:"Uploade information successfully !"})
  } catch (error) {
    res.status(400).send({message:"Internal server error"});
    console.error("Error",Error);
    
  }
}

module.exports = {registerUser,allregisteruser,stampInfomation};
