const express = require("express");
const app = express();
const { urlencoded } = require("express")
const router = require("./src/routes/routesIndex")
const rootSession = require("./src/routes/root")
const randomNumero = require("./src/routes/calculo")

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.set('port', process.env.PORT || 8083)

app.use(`/api`, router);
app.use('/', rootSession)
app.use('/', randomNumero)

app.listen(app.get('port'), () => {
  console.info('listening on port ' + app.get('port'))
})

app.set("view engine", "ejs");


//app.use(express.static("./public"));
