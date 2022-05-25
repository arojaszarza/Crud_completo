const bcrypt = require("bcrypt");
const connection = require("../config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class paintController {
    viewRegisterForm = (req, res) => {
        res.render("registerPainter");
      };

      register = (req, res) => {
        let { name, city, email, password, } = req.body;
        let img = req.file.filename;
    
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) throw error;
          let sql = `INSERT INTO painter (name, city, email, password, img) VALUES ('${name}', '${city}', '${email}', '${hash}', '${img}')`;
          connection.query(sql, (error, result) => {
            if (error) throw error;
            res.redirect(`/painters/profile/${result.insertId}`)
          });
        });
      };



      getProfile = (req, res) => {
        let id = req.params.id;
        let sql = `SELECT * FROM painter WHERE painter_id = '${id}'`;
        let sql2 = `SELECT * FROM art WHERE painter_id = '${id}'`;
        connection.query(sql, (error, resultPainter) => {
          if (error) throw error;
          connection.query(sql2, (error, resultArt) => {
            if (error) throw error;

            // error ? res.status(400).json({error}): res.status(200).json({resultCar, resultClient});
    
            res.render("onePainter", { resultPainter, resultArt });
          });
        });
      };

      viewFormLogin = (req, res) => {
        res.render("login");
      };

      login = (req, res) => {
        let { email, password } = req.body;
        let sql = `SELECT * FROM painter WHERE email = '${email}'`;
    
        connection.query(sql, (error, result) => {
          if (error) throw error;
          if (result.length == 1) {
            let hash = result[0].password;
    
            bcrypt.compare(password, hash, (err, resultCompare) => {
              if (err) throw err;
              if (resultCompare) {
                let clave_secreta = process.env.SECRET_KEY || "supermegasecret";
                let token = jwt.sign(
                  {id: result[0].painter_id, nombre:result[0].name, email: result[0].email,},
                   clave_secreta,
                   {expiresIn: "1 min"});
                console.log(token);

                res.status(200).json(token); 

               // res.redirect(`/painters/profile/${result[0].painter_id}`);
              } else {
               // res.status(401).json("Credenciales incorrectas");
                res.send("credenciales incorrectas");
              }
            });
          } else {
            // res.status(401).json("Credenciales incorrectas");
            res.send("credenciales incorrectas");
          }
        });
      };

      deletePainter = (req, res) => {
        let { painter_id } = req.params;
        let sql = `DELETE FROM painter WHERE painter_id = ${painter_id}`;
        connection.query(sql, (error, result) => {
          if (error) throw error;
          res.redirect(`/`);
        });
      };
  

    }






module.exports = new paintController();