const multer = require("multer");

function uploadImage() {
  const storage = multer.diskStorage({
    // En este caso partimos desde la carpeta principal de nuestro proyecto
    destination: "./public/images",
    //   Escogemos el nombre con el que queremos guardar nuestro archivo
    filename: function (req, file, cb) {
      console.log(file);
      console.log(file.originalname);
      // miriam.jpg
      //capturamos la extensión del nombre original del archivo.
      let extension = file.originalname.split(".")[1];
      console.log(extension);
      //concatenamos la fecha actual con la extensión.

      cb(null, Date.now() + "." + extension);
    },
  });
  //indicamos a multer el name del input de tipo file.
  // El método single nos va a permitir cargar un único archivo. Si cargamos más
  // de uno se caera el servidor y dara un error.
  const upload = multer({ storage: storage }).single("img");
  return upload;
}

module.exports = uploadImage;