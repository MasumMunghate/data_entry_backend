
const {bulkUserServices, getSingleValue, randomDataServices, singleUserAssingment} = require("../services/userpanel.services");


const addBulkUser = async(req , res)=>{
    try {
        const user = await bulkUserServices(req);
       return res.status(200).send({message:"User add successfully" , data:user})
    } catch (error) {
       return res.status(500).json({ error: 'Failed to add users', details: error.message });
    }
}

const getSingleData = async(req, res)=>{
    try {
        const result = await randomDataServices(req);
      return  res.status(200).send({message:"Get data successfully" , data:result})
    } catch (error) {
       return res.status(500).json({ error: 'Failed to get data ', details: error.message });
    }
}

const dataIntoSingleValue = async(req, res)=>{
    try {
        const result = await getSingleValue(req);
       return res.status(200).send({message:"Total Assignment ",data:result})
    } catch (error) {
       return res.status(500).json({ error: 'Failed to get data ', details: error.message });
    }
}

const individualUserAssingment = async(req, res)=>{
    try {
        const result  = await singleUserAssingment(req);
        if(!result){
            return res.status(400).send({message:"No data available"})
        }
        return res.status(200).send({message:"submitted data", result});
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get data ', details: error.message });
    }
}
module.exports = {addBulkUser,getSingleData,dataIntoSingleValue,individualUserAssingment}