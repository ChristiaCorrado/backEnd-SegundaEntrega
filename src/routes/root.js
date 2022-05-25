//express import
const express = require("express");
const root = express.Router();
const {isAuthenticated} = require("../middleware/auth")

//web tokens
const jwt = require("jsonwebtoken");
const PRIVATE_KEY = 'miClavePrivada'

//cookie + session + passport
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


//persistencia
const usuarios = [
  { username: 'ccorrado', password: '1234', admin : true },
  { username: 'jose', password: '1234'  }
]


//<<<<<<<<<<<< MONGO >>>>>>>>>>>>
const connectMongo = require("connect-mongo");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };


//<<<<<<<<<<< session >>>>>>>>>>>>>>>>
root.use(cookieParser())

root.use(
  session({
    store: connectMongo.create({
      mongoUrl:
        "mongodb+srv://admin:1234@cluster0.d5rwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
    }),
    secret: 'SECRETO',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2000, //20 seg
    },
  })
);

root.use(passport.initialize())
root.use(passport.session())



//passport

passport.use(
  'register',

  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      console.log('entro signup')
      const existe = usuarios.find((usuario) => {
        return usuario.nombre == username
      })

      if (existe) {
        return done(null, false)
      } else {
        usuarios.push({ username: username, password: password })
        console.log(usuarios)
        done(null, { username: username })
      }
    }
  )
)

passport.use(
  'login',
  new LocalStrategy((username, password, done) => {
    console.log('entro passpor local strategy')
    const existe = usuarios.find((usuario) => {
      return usuario.username == username && usuario.password == password 
    })
    console.log(existe)
    if (!existe) {
      return done(null, false)
    } else {
      
      
      console.log(existe);
      return done(null, {username: existe.username, admin: existe.admin})
    }
    
  })
)

passport.serializeUser((usuario, done) => {
  
  console.log(usuario.username + 'serializado')
  done(null, usuario.username)
})

passport.deserializeUser((nombre, done) => {
  const usuarioDz = usuarios.find((usuario) => usuario.username == nombre)
  console.log(JSON.stringify(usuarioDz) + ' desserializado')
  done(null, usuarioDz)
})

//registrar

root.get("/register",  (req, res)=>{
  res.render("register")
})

root.post("/register",passport.authenticate('register', {
  successRedirect: '/login',
  failureRedirect: '/login-error',
}))


//login
root.get("/login", (req, res) => {
  req.session.destroy()
  console.log(req.session);
  res.render("root");
});

root.post('/login', passport.authenticate('login', {
  successRedirect: '/api/admin',
  failureRedirect: '/login-error',
}))


root.get("/api/admin", isAuthenticated, (req, res) => {
  res.render("admin")
  
})

module.exports = root;
