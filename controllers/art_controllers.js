const bcrypt = require("bcrypt");
const connection = require("../config/db");
class artController {

    
    showaddArt = (req, res) => {
        let id = req.params.id;
        res.render("addArt", {id});
      };
  
    
  
    addArt = (req, res) => {
      let id = req.params.id;
      let { art_name, year } = req.body;
      let img = req.file.filename;
      let sql = `INSERT INTO art (art_name, year, art_img, painter_id) VALUES ('${art_name}', ${year}, '${img}', ${id})`;
      connection.query(sql, (error, result) => {
        if (error) throw error;
        res.redirect(`/painters/profile/${id}`);
      });
    };
  
    deleteArt = (req, res) => {
      let { art_id, painter_id } = req.params;
      let sql = `DELETE FROM art WHERE art_id = ${art_id}`;
      connection.query(sql, (error, result) => {
        if (error) throw error;
        res.redirect(`/painters/profile/${painter_id}`);
      });
    };
    //EditarArt
    editArt = (req, res) => {
        let id = req.params.id;
        let { art_name, year } = req.body;
        let sql = "";
        if (!year) {
          sql = `UPDATE art SET name = '${art_name}' WHERE art_id = ${id}`;
    
          if (req.file != undefined) {
            let img = req.file.filename;
            sql = `UPDATE art SET name = '${art_name}', year = ${year}, art_img = '${img}' WHERE art_id = ${id}`;
          }
          console.log(sql);
          connection.query(sql, (error, result) => {
            if (error) throw error;
    
            res.redirect(`/painters/profile/${id}`);
          });
        }
     }

}
        

        
      


  
  
  module.exports = new artController();
  