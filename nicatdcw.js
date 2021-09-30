const Discord = require("discord.js") 
const ayarlar = require("./src/config/bot.json") 
const passport = require("passport");
const resydb = require("resydb") 
const db = new resydb("./anticode.json")
const session = require("express-session");
const url = require("url") 
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
const bilgi = {

    oauthSecret: "vBZnwpizI1EagY3Rxowd9s84IXFFQvoH",

    callbackURL: `https://dot-sunny-airplane.glitch.me/callback`,

    domain: `https://dot-sunny-airplane.glitch.me`

  };
passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use(new Strategy({
    clientID: "874749209784500294",
    clientSecret: ayarlar.authsecret,
    callbackURL: bilgi.callbackURL,
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
 function girisCheck(req, res, next) {

    if (req.isAuthenticated()) return next();

    req.session.backURL = req.url;

    res.redirect("/giris");

  }
/*==Sayfa==*/
app.get("/giris", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "";
    }
    next();
    

  },
  passport.authenticate("discord"));

  app.get("/giris", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/en";
    }
    next();
  },
  passport.authenticate("discord"));
  
  app.get("/autherror", (req, res) => {
    res.json({"hata":"Bir hata sonucunda Discord'da bağlanamadım! Lütfen tekrar deneyiniz."})
  });
  
  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/autherror" }), async (req, res) => {
   /* if (Nicat.ayarlar.sahipler.includes(req.user.id)) {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }*/
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);

    } else {
      res.redirect(`/`);
    }
    
    

  });
  

  app.get("/cikis", function(req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
      
    });

    
  });
  
app.get("/", (req , res) => {
  //var isim = Nicat.user.username;
  var aciklama = ayarlar.aciklama;
  res.render("index",{aciklama,user:req.user, Nicat})
  
 });
app.get("/basvuru", girisCheck, (req, res) => {
    var aciklama = ayarlar.aciklama; 
  res.render("basvuru", {aciklama})
 });
app.get("/company", (req, res) => {
     const guild = Nicat.guilds.cache.get(ayarlar.sunucuid);

  
  const sunucusahipleri = guild.members.cache.filter(x => x.roles.cache.has(ayarlar.sunucusahipleri)) //&& !owners.find(b => x.user.id == b) && !admins.find(b => x.user.id == b));
res.render("company",{sunucusahipleri})
 
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
