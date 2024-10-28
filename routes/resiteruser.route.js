const upload = require('../config/multer.config');
const {registerUser, allregisteruser, stampInfomation} = require('../controllers/registeruser.controller');
const validate = require('../Middlewares/validate.middleware');
const registerUserValidate = require('../validation/registeruser.validate');

const router = require('express').Router();

router.post('/registeruser',validate(registerUserValidate), registerUser);
router.get('/allregisteruser', allregisteruser)
router.post('/stampinfo', upload.single('image'), stampInfomation)

module.exports= router;