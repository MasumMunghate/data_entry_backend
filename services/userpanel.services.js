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
  const {userId} = req.params;
  console.log(userId);
  
  try {
    const count = await db.userassignments.count();
    const submit = await db.submitassignment.count();
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

const singleUserAssingment = async(req)=>{
  try {
    const {id} = req.params;
    console.log(id,"id")
    const result = await db.submitassignment.findOne({
      where:{id}
    })
    return result;
  } catch (error) {
    throw error
  }
}
module.exports = {bulkUserServices,randomDataServices,getSingleValue,singleUserAssingment};