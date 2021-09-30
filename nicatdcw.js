const Discord = require("discord.js") 
const ayarlar = require("./src/config/bot.json") 
const passport = require("passport");

const session = require("express-session");

const LevelStore = require("level-session-store")(session);

const Strategy = require("passport-discord").Strategy;


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
const bilgiler = {

    oauthSecret: "vBZnwpizI1EagY3Rxowd9s84IXFFQvoH",

    callbackURL: `https://dash.vortexbot.org/callback`,

    domain: `https://dash.vortexbot.org/`

  };
passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use(new Strategy({
    clientID: Nicat.user.id,
    clientSecret: bilgiler.oauthSecret,
    callbackURL: bilgiler.callbackURL,
    scope: ["identify", "guilds" , "email"]
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }));

  app.use(session({
    secret: 'anticode',
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

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
