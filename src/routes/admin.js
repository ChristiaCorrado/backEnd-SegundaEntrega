//express import
const express = require("express");
const admin = express.Router();

admin.get("/:nombre", async (req, res, next) => {
  try {
    const admLogin = { admin: req.params.nombre };

    res.render("admin", {admLogin});
  } catch (e) {
    next(e);
  }
});

admin.post( '/logout', (req, res)=>{
  

  req.session.destroy()
})

module.exports = admin;
