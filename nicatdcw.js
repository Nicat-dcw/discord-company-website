const Discord = require("discord.js") 
const ayarlar = require("./src/config/bot.json") 
const Nicat = new Discord.Client({disableMentions: "everyone" })
/*==Eventler==*/
Nicat.on("ready", async () => {
  client.user.setStatus("idle")
  client.user.setActivity(ayarlar.durum, {type: "PLAYING"}) 
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
require("./src/web/main.js") 