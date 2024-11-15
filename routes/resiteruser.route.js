
const {registerUser, allregisteruser, stampInfomation, singleUserById, getUserWithPosts, createUserWithPosts, getAllUser, deleteuser, editregisterUser, secondEmailSend, userPaggination, stampData, stampDataById, getAllValue,getStampbyId} = require('../controllers/registeruser.controller');
const validate = require('../Middlewares/validate.middleware');
const registerUserValidate = require('../validation/registeruser.validate');
const multerUploads = require('../Middlewares/multer.middleware');
const router = require('express').Router();


router.post('/registeruser',validate(registerUserValidate), registerUser); // done
router.get('/allregisteruser', allregisteruser) //done
router.post('/stampinfo',multerUploads ,stampInfomation)
router.get('/registeruserstampinfo', getAllUser); // one-to-one relation findall data 
router.get('/getStampbyId/:id', getStampbyId);// one-to-one relation by id
router.get('/registeruser/:id', singleUserById); 

// router.post('/users', createUserWithPosts); //one to many
// router.get('/users/:id', getUserWithPosts); // one to many by id

router.delete('/deleteuser/:id' , deleteuser)
router.put('/edituser/:id', editregisterUser)
router.post('/sendemail/:id', secondEmailSend)
router.get('/getalluser' , userPaggination)
router.get('/stampdata', stampData)
router.get('/stampdata/:id', stampDataById)
router.get('/getallvalue', getAllValue)
module.exports= router;