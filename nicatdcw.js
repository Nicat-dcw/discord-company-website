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
  //var isim = Nicat.user.username;
  var aciklama = ayarlar.aciklama;
  res.render("index",{aciklama})
  
 });
app.get("/basvuru", (req, res) => {
    var aciklama = ayarlar.aciklama; 
  res.render("basvuru", {aciklama})
 });
app.post("/basvuru",(req, res) => {
  let sisim = req.body.sisim;
  let sid = req.body.sid;
  let ksayi = req.body.ksayi;
  Nicat.channels.cache.get(ayarlar.logkanal).send(`
==Sunucu Başvurusu ✔==
Sunucu Ismi ❯ **${sisim}**
Sunucu ID ❯ \`${sid}\`
Üye Sayısı ❯ **${ksayi}**
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
Başvuran » 

  `)
  res.redirect("/basvuran") 
 
  });
app.listen(8080)
