const userLogin = require('../controllers/userAuth.controller');

const router = require('express').Router();

router.post('/userlogin',userLogin);

module.exports = router