
const {bulkUserServices, getSingleValue, randomDataServices} = require("../services/userpanel.services");


const addBulkUser = async(req , res)=>{
    try {
        const user = await bulkUserServices(req);
        res.status(200).send({message:"User add successfully" , data:user})
    } catch (error) {
        res.status(500).json({ error: 'Failed to add users', details: error.message });
    }
}

const getSingleData = async(req, res)=>{
    try {
        const result = await randomDataServices(req);
        res.status(200).send({message:"Get data successfully" , data:result})
    } catch (error) {
        res.status(500).json({ error: 'Failed to get data ', details: error.message });
    }
}

const dataIntoSingleValue = async(req, res)=>{
    try {
        const result = await getSingleValue(req);
        res.status(200).send({message:"Total Assignment ",data:result})
    } catch (error) {
        res.status(500).json({ error: 'Failed to get data ', details: error.message });
    }
}
module.exports = {addBulkUser,getSingleData,dataIntoSingleValue}