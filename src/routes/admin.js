//express import
const express = require("express");
const admin = express.Router();
const {isAuthenticated} = require("../middleware/auth")

const cookieParser = require("cookie-parser");
const session = require('express-session');



admin.post( '/logout', isAuthenticated,(req, res)=>{
  console.log(req.session);
  res.redirect('/login');

  
})

module.exports = admin;
