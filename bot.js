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
        console.log(`${chalk.green.bold('👻 Leon')}
${chalk.white.bold('💬 Version:')} ${chalk.red.bold(config.VERSION)}
${chalk.blue.italic('👤 Made By TOXIC-DEVIL')}

${chalk.green.bold("🔄 Connecting...")}`);
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
       
         var startMsg = { en: "%2A%F0%9F%91%BB%20LEON%20IS%20NOW%20ACTIVE%2A", ml: "%2A%F0%9F%91%BB%20%E0%B4%B2%E0%B4%BF%E0%B4%AF%E0%B5%8B%E0%B5%BA%20%E0%B4%87%E0%B4%AA%E0%B5%8D%E0%B4%AA%E0%B5%8B%E0%B5%BE%20%E0%B4%B8%E0%B4%9C%E0%B5%80%E0%B4%B5%E0%B4%AE%E0%B4%BE%E0%B4%A3%E0%B5%8D%2A", id: "%2A%F0%9F%91%BB%20Leon%20sekarang%20aktif%2A" }

         if (config.LANG == 'EN') {
             await Leon.sendMessage(Leon.user.jid, decodeURI(startMsg.en), MessageType.text);
         } else if (config.LANG == 'ID') {
             await Leon.sendMessage(Leon.user.jid, decodeURI(startMsg.id), MessageType.text);             
         } else {
             await Leon.sendMessage(Leon.user.jid, decodeURI(startMsg.ml), MessageType.text);
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

        var _0x4f3ecf=_0x3242;function _0x3242(_0x26c161,_0x29edcd){var _0x550a72=_0x550a();return _0x3242=function(_0x324247,_0x5a3888){_0x324247=_0x324247-0x1cc;var _0x15b1f3=_0x550a72[_0x324247];return _0x15b1f3;},_0x3242(_0x26c161,_0x29edcd);}function _0x550a(){var _0x4fbd53=['updatePresence','online','239099wdZUeu','BOT_PRESENCE','1533838mRittB','recording','1319241vRYoVk','1662792ZHghWd','composing','typing','4592330wcDecM','offline','5765992RSBUTR','available','key','remoteJid','4WzEbaA','unavailable','7713174XduhxB'];_0x550a=function(){return _0x4fbd53;};return _0x550a();}(function(_0x368706,_0x575751){var _0xcb37bd=_0x3242,_0x443a4f=_0x368706();while(!![]){try{var _0x44a554=-parseInt(_0xcb37bd(0x1d8))/0x1+parseInt(_0xcb37bd(0x1da))/0x2+-parseInt(_0xcb37bd(0x1dc))/0x3+-parseInt(_0xcb37bd(0x1d3))/0x4*(-parseInt(_0xcb37bd(0x1cd))/0x5)+parseInt(_0xcb37bd(0x1dd))/0x6+-parseInt(_0xcb37bd(0x1d5))/0x7+parseInt(_0xcb37bd(0x1cf))/0x8;if(_0x44a554===_0x575751)break;else _0x443a4f['push'](_0x443a4f['shift']());}catch(_0x340b33){_0x443a4f['push'](_0x443a4f['shift']());}}}(_0x550a,0xdc58a));if(config[_0x4f3ecf(0x1d9)]==_0x4f3ecf(0x1ce))await Leon[_0x4f3ecf(0x1d6)](msg[_0x4f3ecf(0x1d1)][_0x4f3ecf(0x1d2)],Presence[_0x4f3ecf(0x1d4)]);else{if(config['BOT_PRESENCE']==_0x4f3ecf(0x1d7))await Leon[_0x4f3ecf(0x1d6)](msg[_0x4f3ecf(0x1d1)][_0x4f3ecf(0x1d2)],Presence[_0x4f3ecf(0x1d0)]);else{if(config[_0x4f3ecf(0x1d9)]==_0x4f3ecf(0x1cc))await Leon[_0x4f3ecf(0x1d6)](msg[_0x4f3ecf(0x1d1)][_0x4f3ecf(0x1d2)],Presence[_0x4f3ecf(0x1de)]);else config[_0x4f3ecf(0x1d9)]==_0x4f3ecf(0x1db)&&await Leon[_0x4f3ecf(0x1d6)](msg['key'][_0x4f3ecf(0x1d2)],Presence[_0x4f3ecf(0x1db)]);}}
        
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
                            whats = new Image(Leon, msg);
                        } else if (command.on !== undefined && (command.on === 'video' )
                        && msg.message.videoMessage !== null) {
                            whats = new Video(Leon, msg);
                        } else {
                            whats = new Message(Leon, msg);
                        }
                      
                        if (config.PVTDELMSG == 'true' && command.deleteCommand && msg.key.fromMe) {
                            await whats.delete();
                        }
                        
                        try {
                            await command.function(whats, match);
                        }
                        catch (error) {

                            var errorMsg = { en: "%0A%2A%E3%80%8E%20ERROR%20%E3%80%8F%2A%0A%0A%2ALeon%20an%20error%20has%20occurred%21%2A%0A%0A%2AError:%2A%20%60%60%60", ml: "%0A%2A%E3%80%8E%20%E0%B4%AA%E0%B4%BF%E0%B4%B6%E0%B4%95%E0%B5%8D%20%E3%80%8F%2A%0A%0A%2ALeon%20%E0%B4%AA%E0%B4%BF%E0%B4%B6%E0%B4%95%E0%B5%8D%20%E0%B4%B8%E0%B4%82%E0%B4%AD%E0%B4%B5%E0%B4%BF%E0%B4%9A%E0%B5%8D%E0%B4%9A%E0%B5%81%21%2A%0A%0A%2A%E0%B4%AA%E0%B4%BF%E0%B4%B6%E0%B4%95%E0%B5%8D%3A%2A%20%60%60%60%0A", id: "%0A%2A%E3%80%8E%20KESALAHAN%20%E3%80%8F%2A%0A%0A%2ALeon%20telah%20terjadi%20kesalahan%21%2A%0A%0A%2AKesalahan%3A%2A%20%60%60%60%0A" }

                            if (config.LANG == 'EN') {
                                await Leon.sendMessage(Leon.user.jid, decodeURI(errorMsg.en) + error + '```\n\n', MessageType.text);
                                
                            } else if (config.LANG == 'ML') {
                                await Leon.sendMessage(Leon.user.jid, decodeURI(errorMsg.ml) + error + '```\n\n', MessageType.text);
                                
                            } else {
                                await Leon.sendMessage(Leon.user.jid, decodeURI(errorMsg.id) + error + '```\n\n', MessageType.text);
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
