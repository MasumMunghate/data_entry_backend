// add bulk data 

const {addBulkUser, getSingleData, dataIntoSingleValue} = require('../controllers/bulkdata.controller');

const router = require('express').Router();

router.post('/addbulkuser', addBulkUser); // done
router.get('/getsingledata',getSingleData); // done
router.get('/singlevalue',dataIntoSingleValue);

module.exports = router;