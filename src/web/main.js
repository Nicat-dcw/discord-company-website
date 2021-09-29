const express = require("express");
//const bodyParser = require("body-parser") 
const app = express();
const path = require("path");
//const client = require("nicatdcw.js") 

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'))
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const dataDir = path.resolve(`${process.cwd()}${path.sep}web`);

  const templateDir = path.resolve(`${dataDir}${path.sep}sayfa${path.sep}`);



app.set('view engine', 'ejs')
/*==Sayfa==*/
const renderr = (res, req, template, data = {}) => {

    const baseData = {

      //bot: client,

      path: req.path,

      user: req.isAuthenticated() ? req.user : null

    };

    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));

  };
app.get("/", (req, res) => {
  renderr("index")
 });
app.get("/company", (req, res) => {
  res.render("company")
 });
app.listen(8080)
        
