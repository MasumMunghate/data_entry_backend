
const {registerUser, allregisteruser, stampInfomation, singleUserById, getUserWithPosts, createUserWithPosts, getAllUser, deleteuser, editregisterUser, secondEmailSend} = require('../controllers/registeruser.controller');
const validate = require('../Middlewares/validate.middleware');
const registerUserValidate = require('../validation/registeruser.validate');
const multerUploads = require('../Middlewares/multer.middleware');
const router = require('express').Router();


router.post('/registeruser',validate(registerUserValidate), registerUser);
router.get('/allregisteruser', allregisteruser)
router.post('/stampinfo',multerUploads ,stampInfomation)
router.get('/registeruserstampinfo', getAllUser); // one-to-one relation findall data 
router.get('/registeruser/:id', singleUserById); // one-to-one relation by id

// router.post('/users', createUserWithPosts); //one to many
// router.get('/users/:id', getUserWithPosts); // one to many by id

router.delete('/deleteuser/:id' , deleteuser)
router.put('/edituser/:id', editregisterUser)
router.post('/sendemail', secondEmailSend)

module.exports= router;