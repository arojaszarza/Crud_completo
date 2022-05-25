

var express = require('express');
const indexController = require("../controllers/index_controllers");
var router = express.Router();
const uploadImage = require("../middleware/uploadfile")




router.get("/", indexController.viewHome );

module.exports = router;