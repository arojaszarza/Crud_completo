var express = require('express');
const paintController = require("../controllers/paint_controllers");
var router = express.Router();
const uploadImage = require("../middleware/uploadfile")
const verify = require("../middleware/verify");

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// ruta base: localhost:3000/painters



// localhost:3000/painters/registro; 

router.get("/registro", paintController.viewRegisterForm );

//localhost:3000/painters/registro

router.post("/registro", uploadImage(), paintController.register);
//localhost:3000/painters/profile/:id
router.get("/profile/:id",verify, paintController.getProfile);

//localhost:3000/painters/login
router.get("/login", paintController.viewFormLogin);
//localhost:3000/painters/login
router.post("/login", paintController.login);
//localhost:3000/painters/deletePainter/
router.get("/deletePainter/:painter_id/", paintController.deletePainter);


module.exports = router;
