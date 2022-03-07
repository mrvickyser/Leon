const fs = require("fs");
const path = require("path");
const events = require("./events");
const chalk = require('chalk');
const config = require('./config');
const exec = require('child_process').exec;
const axios = require('axios');
const Heroku = require('heroku-client');
const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const {Message, StringSession, Image, Video} = require('./leon/');
const { DataTypes } = require('sequelize');
const { GreetingsDB, getMessage } = require("./plugins/sql/greetings");
const got = require('got');

const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});

let baseURI = '/apps/' + config.HEROKU.APP_NAME;


const LeonDB = config.DATABASE.define('Bot', {
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

fs.readdirSync('./plugins/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./plugins/sql/' + plugin);
    }
});

const plugindb = require('./plugins/sql/plugin');

String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};

if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

async function start() {
    await config.DATABASE.sync();
    var StrSes_Db = await LeonDB.findAll({
        where: {
          info: 'StringSession'
        }
    });
    
    const Leon = new WAConnection();
    const Session = new StringSession();
    Leon.version = [3, 3430, 9]
    Leon.setMaxListeners(0);

    Leon.logger.level = config.DEBUG ? 'debug' : 'warn';
    var nodb;

    if (StrSes_Db.length < 1) {
        nodb = true;
        Leon.loadAuthInfo(Session.deCrypt(config.SESSION)); 
    } else {
        Leon.loadAuthInfo(Session.deCrypt(StrSes_Db[0].dataValues.value));
    }

    Leon.on ('open', async () => {
        console.log(
            chalk.blueBright.italic('🔁 CHECKING FOR COMMANDS...')
        );

        const authInfo = Leon.base64EncodedAuthInfo();
        if (StrSes_Db.length < 1) {
            await LeonDB.create({ info: "StringSession", value: Session.createStringSession(authInfo) });
        } else {
            await StrSes_Db[0].update({ value: Session.createStringSession(authInfo) });
        }
    })    

    Leon.on('connecting', async () => {
        console.log(`${chalk.green.bold('WhatAlexa')}
${chalk.white.bold('Version:')} ${chalk.red.bold(config.VERSION)}
${chalk.blue.italic('Made By TOXIC-DEVIL')}`);
    });
    

    Leon.on('open', async () => {
        console.log(
            chalk.green.bold('🛑 NO COMMANDS FOUND!')
        );

        console.log(
            chalk.blueBright.italic('⬇️ INSTALLING COMMANDS...')
        );

        var plugins = await plugindb.PluginDB.findAll();
        plugins.map(async (plugin) => {
          try {
              if (!fs.existsSync('./plugins/' + plugin.dataValues.name + '.js')) {
                  console.log(plugin.dataValues.name);
                  var response = await got(plugin.dataValues.url);
                  if (response.statusCode == 200) {
                      fs.writeFileSync('./plugins/' + plugin.dataValues.name + '.js', response.body);
                      require('./plugins/' + plugin.dataValues.name + '.js');
                  }     
              }
          } catch {
              console.log('❌ PLUGIN (' + plugin.dataValues.name + ') HAS BEEN CORRUPTED!')
          }
        });

        console.log(
            chalk.blueBright.italic('✅ COMMANDS INSTALLED SUCCESSFULLY!')
        );

        fs.readdirSync('./plugins').forEach(plugin => {
            if(path.extname(plugin).toLowerCase() == '.js') {
                require('./plugins/' + plugin);
            }
        });

        console.log(
            chalk.green.bold('🎉 LEON IS NOW ACTIVE IN YOUR ACCOUNT!')
        );
        
         if (config.LANG == 'EN') {
             await Leon.sendMessage(Leon.user.jid, decodeURIComponent("KvCfkbsgTEVPTiBJUyBOT1cgQUNUSVZFKg=="), MessageType.text);
         } else if (config.LANG == 'ID') {
             await Leon.sendMessage(Leon.user.jid, decodeURIComponent("KvCfkbsgTGVvbiBzZWthcmFuZyBha3RpZio="), MessageType.text);             
         } else {
             await Leon.sendMessage(Leon.user.jid, decodeURIComponent("KvCfkbsg4LSy4LS/4LSv4LWL4LW6IOC0h+C0quC1jeC0quC1i+C1viDgtLjgtJzgtYDgtLXgtK7gtL7gtKPgtY0q"), MessageType.text);
        }
    });
    
    setInterval(async () => { 
        if (config.AUTOBIO == 'true') {
            if (Leon.user.jid.startsWith('90')) { 
                var ov_time = new Date().toLocaleString('LK', { timeZone: 'Europe/Istanbul' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else if (Leon.user.jid.startsWith('994')) { 
                var ov_time = new Date().toLocaleString('AZ', { timeZone: 'Asia/Baku' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else if (Leon.user.jid.startsWith('94')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('LK', { timeZone: 'Asia/Colombo' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else if (Leon.user.jid.startsWith('351')) { 
                var ov_time = new Date().toLocaleString('PT', { timeZone: 'Europe/Lisbon' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else if (Leon.user.jid.startsWith('75')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('RU', { timeZone: 'Europe/Kaliningrad' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else if (Leon.user.jid.startsWith('91')) { 
                var ov_time = new Date().toLocaleString('HI', { timeZone: 'Asia/Kolkata' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else if (Leon.user.jid.startsWith('62')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('ID', { timeZone: 'Asia/Jakarta' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else if (Leon.user.jid.startsWith('49')) { 
                var ov_time = new Date().toLocaleString('DE', { timeZone: 'Europe/Berlin' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else if (Leon.user.jid.startsWith('61')) {  
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('AU', { timeZone: 'Australia/Lord_Howe' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else if (Leon.user.jid.startsWith('55')) { 
                var ov_time = new Date().toLocaleString('BR', { timeZone: 'America/Noronha' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else if (Leon.user.jid.startsWith('33')) {
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('FR', { timeZone: 'Europe/Paris' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else if (Leon.user.jid.startsWith('34')) { 
                var ov_time = new Date().toLocaleString('ES', { timeZone: 'Europe/Madrid' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else if (Leon.user.jid.startsWith('44')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('GB', { timeZone: 'Europe/London' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else if (Leon.user.jid.startsWith('39')) {  
                var ov_time = new Date().toLocaleString('IT', { timeZone: 'Europe/Rome' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else if (Leon.user.jid.startsWith('7')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('KZ', { timeZone: 'Asia/Almaty' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else if (Leon.user.jid.startsWith('998')) {  
                var ov_time = new Date().toLocaleString('UZ', { timeZone: 'Asia/Samarkand' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else if (Leon.user.jid.startsWith('993')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('TM', { timeZone: 'Asia/Ashgabat' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
            else {
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('EN', { timeZone: 'America/New_York' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By Leon'
                await Leon.setStatus(biography)
            }
        }
    }, 7890);
    
    Leon.on('message-new', async msg => {
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return;

        var _0x4f3ecf=_0x3242;function _0x3242(_0x26c161,_0x29edcd){var _0x550a72=_0x550a();return _0x3242=function(_0x324247,_0x5a3888){_0x324247=_0x324247-0x1cc;var _0x15b1f3=_0x550a72[_0x324247];return _0x15b1f3;},_0x3242(_0x26c161,_0x29edcd);}function _0x550a(){var _0x4fbd53=['updatePresence','online','239099wdZUeu','BOT_PRESENCE','1533838mRittB','recording','1319241vRYoVk','1662792ZHghWd','composing','typing','4592330wcDecM','offline','5765992RSBUTR','available','key','remoteJid','4WzEbaA','unavailable','7713174XduhxB'];_0x550a=function(){return _0x4fbd53;};return _0x550a();}(function(_0x368706,_0x575751){var _0xcb37bd=_0x3242,_0x443a4f=_0x368706();while(!![]){try{var _0x44a554=-parseInt(_0xcb37bd(0x1d8))/0x1+parseInt(_0xcb37bd(0x1da))/0x2+-parseInt(_0xcb37bd(0x1dc))/0x3+-parseInt(_0xcb37bd(0x1d3))/0x4*(-parseInt(_0xcb37bd(0x1cd))/0x5)+parseInt(_0xcb37bd(0x1dd))/0x6+-parseInt(_0xcb37bd(0x1d5))/0x7+parseInt(_0xcb37bd(0x1cf))/0x8;if(_0x44a554===_0x575751)break;else _0x443a4f['push'](_0x443a4f['shift']());}catch(_0x340b33){_0x443a4f['push'](_0x443a4f['shift']());}}}(_0x550a,0xdc58a));if(config[_0x4f3ecf(0x1d9)]==_0x4f3ecf(0x1ce))await conn[_0x4f3ecf(0x1d6)](msg[_0x4f3ecf(0x1d1)][_0x4f3ecf(0x1d2)],Presence[_0x4f3ecf(0x1d4)]);else{if(config['BOT_PRESENCE']==_0x4f3ecf(0x1d7))await conn[_0x4f3ecf(0x1d6)](msg[_0x4f3ecf(0x1d1)][_0x4f3ecf(0x1d2)],Presence[_0x4f3ecf(0x1d0)]);else{if(config[_0x4f3ecf(0x1d9)]==_0x4f3ecf(0x1cc))await conn[_0x4f3ecf(0x1d6)](msg[_0x4f3ecf(0x1d1)][_0x4f3ecf(0x1d2)],Presence[_0x4f3ecf(0x1de)]);else config[_0x4f3ecf(0x1d9)]==_0x4f3ecf(0x1db)&&await conn[_0x4f3ecf(0x1d6)](msg['key'][_0x4f3ecf(0x1d2)],Presence[_0x4f3ecf(0x1db)]);}}
        
        if (msg.messageStubType === 32 || msg.messageStubType === 28) {

            var gb = await getMessage(msg.key.remoteJid, 'goodbye');
            if (gb !== false) {
                if (gb.message.includes('{pp}')) {
                  let pp 
                  try { pp = await Leon.getProfilePicture(msg.messageStubParameters[0]); } catch { pp = await Leon.getProfilePicture(); }
                   var json = await Leon.groupMetadata(msg.key.remoteJid)
                   await axios.get(pp, {responseType: 'arraybuffer'}).then(async (res) => {
                   await Leon.sendMessage(msg.key.remoteJid, res.data, MessageType.image, { mimetype: Mimetype.png, caption:  gb.message.replace('{pp}', '').replace('{gcname}', json.subject).replace('{gcowner}', json.owner).replace('{gcdesc}', json.desc).replace('{owner}', Leon.user.name) }); });   
                } else {
                   var json = await Leon.groupMetadata(msg.key.remoteJid)
                   await Leon.sendMessage(msg.key.remoteJid, gb.message.replace('{pp}', '').replace('{gcname}', json.subject).replace('{gcowner}', json.owner).replace('{gcdesc}', json.desc).replace('{owner}', Leon.user.name), MessageType.text);   
            }
          }  
            return;
        } else if (msg.messageStubType === 27 || msg.messageStubType === 31) {

             var gb = await getMessage(msg.key.remoteJid);
            if (gb !== false) {
                if (gb.message.includes('{pp}')) {
                  let pp 
                  try { pp = await Leon.getProfilePicture(msg.messageStubParameters[0]); } catch { pp = await Leon.getProfilePicture(); }
                   var json = await Leon.groupMetadata(msg.key.remoteJid)
                   await axios.get(pp, {responseType: 'arraybuffer'}).then(async (res) => {
                   await Leon.sendMessage(msg.key.remoteJid, res.data, MessageType.image, { mimetype: Mimetype.png, caption:  gb.message.replace('{pp}', '').replace('{gcname}', json.subject).replace('{gcowner}', json.owner).replace('{gcdesc}', json.desc).replace('{owner}', Leon.user.name) }); });   
                } else {
                   var json = await Leon.groupMetadata(msg.key.remoteJid)
                   await Leon.sendMessage(msg.key.remoteJid, gb.message.replace('{pp}', '').replace('{gcname}', json.subject).replace('{gcowner}', json.owner).replace('{gcdesc}', json.desc).replace('{owner}', Leon.user.name), MessageType.text);   
            }
          }         
            return;                               
    }
        if (config.BLOCKCHAT !== false) {     
            var abc = config.BLOCKCHAT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }

        events.commands.map(
            async (command) =>  {
                if (msg.message && msg.message.imageMessage && msg.message.imageMessage.caption) {
                    var text_msg = msg.message.imageMessage.caption;
                } else if (msg.message && msg.message.videoMessage && msg.message.videoMessage.caption) {
                    var text_msg = msg.message.videoMessage.caption;
                } else if (msg.message) {
                    var text_msg = msg.message.extendedTextMessage === null ? msg.message.conversation : msg.message.extendedTextMessage.text;
                } else {
                    var text_msg = undefined;
                }

                if ((command.on !== undefined && (command.on === 'image' || command.on === 'photo')
                    && msg.message && msg.message.imageMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg)))) || 
                    (command.pattern !== undefined && command.pattern.test(text_msg)) || 
                    (command.on !== undefined && command.on === 'text' && text_msg) ||
                    // Video
                    (command.on !== undefined && (command.on === 'video')
                    && msg.message && msg.message.videoMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg))))) {

                    let sendMsg = false;
                    var chat = Leon.chats.get(msg.key.remoteJid)
                        
                    if ((config.SUDO !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.SUDO || config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.SUDO)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
    
                    if (sendMsg) {
                        if (config.SEND_READ && command.on === undefined) {
                            await Leon.chatRead(msg.key.remoteJid);
                        }
                        
                        var match = text_msg.match(command.pattern);
                        
                        if (command.on !== undefined && (command.on === 'image' || command.on === 'photo' )
                        && msg.message.imageMessage !== null) {
                            whats = new Image(conn, msg);
                        } else if (command.on !== undefined && (command.on === 'video' )
                        && msg.message.videoMessage !== null) {
                            whats = new Video(conn, msg);
                        } else {
                            whats = new Message(conn, msg);
                        }
                      
                        if (config.PVTDELMSG == 'true' && command.deleteCommand && msg.key.fromMe) {
                            await whats.delete();
                        }
                        
                        try {
                            await command.function(whats, match);
                        }
                        catch (error) {
                            if (config.LANG == 'EN') {
                                await Leon.sendMessage(Leon.user.jid, fs.readFileSync("./src/image/TOXIC-DEVIL.png"), MessageType.image, { mimetype: Mimetype.png, caption: '*『 ERROR 』*\n\n*WhatsAlexa an error has occurred!*\n_Report this error to the developer! [ TOXIC-DEVIL ]._\n\n*Error:* ```' + error + '```\n\n' });
                                
                            } else if (config.LANG == 'ML') {
                                await Leon.sendMessage(Leon.user.jid, fs.readFileSync("./src/image/TOXIC-DEVIL.png"), MessageType.image, { mimetype: Mimetype.png, caption: '*『 പിശക് 』*\n\n*WhatsAlexa പിശക് സംഭവിച്ചു!*\n_ഈ പിശക് ഡെവലപ്പറെ അറിയിക്കുക! [ TOXIC-DEVIL ]._\n\n*പിശക്:* ```' + error + '```\n\n' });
                                
                            } else {
                                await Leon.sendMessage(Leon.user.jid, fs.readFileSync("./src/image/TOXIC-DEVIL.png"), MessageType.image, { mimetype: Mimetype.png, caption: '*『 KESALAHAN 』*\n\n*WhatsAlexa telah terjadi kesalahan!*\n_Laporkan kesalahan ini ke pengembang [ TOXIC-DEVIL ]._\n\n*Kesalahan:* ```' + error + '```\n\n' });
                            }
                        }
                    }
                }
            }
        )
    });

    try {
        await Leon.connect();
    } catch {
        if (!nodb) {
            console.log(chalk.red.bold('ERROR...'))
            Leon.loadAuthInfo(Session.deCrypt(config.SESSION)); 
            try {
                await Leon.connect();
            } catch {
                return;
            }
        }
    }
}

start();
