const userbulkassingment = require("../models/userassignment.model");
const data = require('../unique_random_data.json');
const db = require('../models');


const bulkUserServices = async(req)=>{
    try {
      return  await userbulkassingment.bulkCreate(data)
    } catch (error) {
        throw error
    }
}


const randomDataServices = async(req)=>{

  try {
   console.log(req.body,"body");
   
    
    const count = await db.userassignments.count();
    const randomOffset = Math.floor(Math.random()*count);
    const randonUser = await db.userassignments.findOne({offset:randomOffset});
    return randonUser
  } catch (error) {
    throw error
  }
}

const getSingleValue = async(req)=>{
  try {
    const result = await db.userassignments.count();
    return result
  } catch (error) {
    throw error
  }
}
module.exports = {bulkUserServices,randomDataServices,getSingleValue};