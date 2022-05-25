
const bcrypt = require("bcrypt");
const connection = require("../config/db");

class indexController{
    viewHome= (req, res) => {
        let sql = `SELECT * FROM painter`;
        let sql2 = `SELECT * FROM art`;
    
        connection.query(sql, (error, resultPainter) => {
          if (error) throw error;
          connection.query(sql2, (error, resultArt) => {
            if (error) throw error;
    
            res.render("home", { resultPainter, resultArt });
          });
        });
      };
    
  
    }

module.exports = new indexController();