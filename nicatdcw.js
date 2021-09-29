const Discord = require("discord.js") 
const ayarlar = require("./src/config/bot.json") 
const Nicat = new Discord.Client({disableMentions: "everyone" })
/*==Eventler==*/
Nicat.on("ready", async () => {
  Nicat.user.setStatus("idle")
  Nicat.user.setActivity(ayarlar.durum, {type: "PLAYING"}) 
  setTimeout(function(){
    console.log(`
    ▄▄▄▄▄▄▄▄▄▄▄▄▄
               Bot Başlatıldı! 
     Isim ❯ ${Nicat.user.username}
     Tag ❯ ${Nicat.user.discriminator}
        
        » By NicatDCW | AntiCode🖤
               ▄▄▄▄▄▄▄▄▄▄▄▄▄
               `) 
   }, 5000)
 });
Nicat.login(process.env.TOKEN) 
/*==Site==*/
//require("./src/web/main.js") 
const express = require("express");

const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set('view engine', 'ejs');

/*==Sayfa==*/
app.get("/", (req , res) => {
  res.render("index")
  
 });
app.listen(8080)
