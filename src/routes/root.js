//express import
const express = require("express");
const root = express.Router();

//cookie + session
const cookieParser = require("cookie-parser");
const session = require("express-session");



const connectMongo = require('connect-mongo');

const advancedOptions = {useNewUrlParser : true, useUnifiedTopology : true}

root.use(
  session({
    store: connectMongo.create({
      mongoUrl:"mongodb+srv://admin:1234@cluster0.d5rwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      mongoOptions: advancedOptions 
    }),
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
  })
)

root.get("/login", (req, res) => {

  res.render("root")

  
});

root.post('/login', (req,res) => {
  console.log(req.body.nombre);
  const admLog = req.session.nombre
  if (!req.session.nombre) {
    req.body.nombre
      ? (req.session.nombre = req.body.nombre)
      : (req.session.nombre = "anonimo");
  }
  if (req.session.nombre === "anonimo" || "") {
    
    res.redirect("/api/productos" );
  } else {
    console.log(req.session.nombre);
    res.redirect(`/api/admin/${req.session.nombre}`) 
  }
 
})





module.exports = root
