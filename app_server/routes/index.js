var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');

//get home page and display to local http
router.get('/', ctrlMain.index);
module.exports = router;