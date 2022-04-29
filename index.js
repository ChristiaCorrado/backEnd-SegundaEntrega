const express = require("express");
const app = express();
const { urlencoded } = require("express")
const router = require("./src/routes/routesIndex")


app.use(express.json());
app.use(urlencoded({ extended: true }));

app.set('port', process.env.PORT || 8080)

app.use(`/api`, router);

app.listen(app.get('port'), () => {
  console.info('listening on port ' + app.get('port'))
})

