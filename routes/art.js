const connection = require("../config/db");

var express = require('express');
const artController = require("../controllers/art_controllers");
var router = express.Router();
const uploadImage = require("../middleware/uploadfile")


//rutabase: localhost:3000/art


//localhost:3000/art/nuevaObra/:id

router.get("/nuevaObra/:id", artController.showaddArt);

//localhost:3000/art/nuevaObra/:id
router.post("/nuevaObra/:id", uploadImage(), artController.addArt);

// localhost:3000/art/deleteArt/:art_id/:painter_id

router.get("/deleteArt/:art_id/:painter_id", artController.deleteArt);

//localhost:3000/art/editArt/:art_id/

router.get("/editArt/:art_id/", artController.editArt);

//localhost:3000/art/editArt/:art_id/

router.get("/editArt/:art_id/", artController.editArt);













module.exports = router;