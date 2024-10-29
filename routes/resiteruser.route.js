
const {registerUser, allregisteruser, stampInfomation} = require('../controllers/registeruser.controller');
const validate = require('../Middlewares/validate.middleware');
const registerUserValidate = require('../validation/registeruser.validate');
const multerUploads = require('../Middlewares/multer.middleware');
const router = require('express').Router();


router.post('/registeruser',validate(registerUserValidate), registerUser);
router.get('/allregisteruser', allregisteruser)
router.post('/stampinfo',multerUploads ,stampInfomation)



module.exports= router;