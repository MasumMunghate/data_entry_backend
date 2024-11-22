// add bulk data 

const {addBulkUser, getSingleData, dataIntoSingleValue} = require('../controllers/bulkdata.controller');
const { assingmentSubmition } = require('../controllers/registeruser.controller');

const router = require('express').Router();

router.post('/addbulkuser', addBulkUser); // done
router.get('/getsingledata/:userId',getSingleData); // done
router.get('/singlevalue',dataIntoSingleValue);
router.get('/userdetailswithassingmentsubmition/:id' , assingmentSubmition)

module.exports = router;