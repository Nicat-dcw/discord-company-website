const express = require("express");
//const bodyParser = require("body-parser") 
const app = express();

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'))
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs')
/*==Sayfa==*/
app.get("/", (req, res) => {
  res.render("index")
 });
        
