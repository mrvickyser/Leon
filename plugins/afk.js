let Bot = require('../events');
let {MessageType} = require('@adiwajshing/baileys');
let Config = require('../config');
let Language = require('../language');
let Lang = Language.getString('afk');

let AFK = {
    isAfk: false,
    reason: false,
    lastseen: 0
};

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " " + Lang.HOUR + ", " : " " + Lang.HOUR + ", ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " " + Lang.MINUTE + ", " : " " + Lang.MINUTE + ", ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " " + Lang.SECOND : " " + Lang.SECOND) : "";
    return hDisplay + mDisplay + sDisplay; 
}

Bot.addCommand({on: 'text', fromMe: false, deleteCommand: false}, (async (message, match) => {
    if (Config.AFKMSG == 'default') {

        if (AFK.isAfk && ((!message.jid.includes('-')) || (message.jid.includes('-') && 
            (( message.mention !== false && message.mention.length !== 0 ) || message.reply_message !== false)))) {
            if (message.jid.includes('-') && (message.mention !== false && message.mention.length !== 0)) {
                message.mention.map(async (jid) => {
                    if (message.client.user.jid.split('@')[0] === jid.split('@')[0]) {
                        await message.client.sendMessage(message.jid,Lang.AFK_TEXT + '\n' + 
                        (AFK.reason !== false ? '\n*' + Lang.REASON + ':* ```' + AFK.reason + '```' : '') + 
                        (AFK.lastseen !== 0 ? '\n*' + Lang.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + ' once```' : ''), MessageType.text, {quoted: message.data});            
                    }
                })
            } else if (message.jid.includes('-') && message.reply_message !== false) {
                if (message.reply_message.jid.split('@')[0] === message.client.user.jid.split('@')[0]) {
                    await message.client.sendMessage(message.jid,Lang.AFK_TEXT + '\n' + 
                        (AFK.reason !== false ? '\n*' + Lang.REASON + ':* ```' + AFK.reason + '```' : '') + 
                        (AFK.lastseen !== 0 ? '\n*' + Lang.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + ' once```' : ''), MessageType.text, {quoted: message.data});
                }
            } else {
                await message.client.sendMessage(message.jid,Lang.AFK_TEXT + '\n' + 
                (AFK.reason !== false ? '\n*' + Lang.REASON + ':* ```' + AFK.reason + '```' : '') + 
                (AFK.lastseen !== 0 ? '\n*' + Lang.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + ' once```' : ''), MessageType.text, {quoted: message.data});
            }
        }
    }
    else {
        if (AFK.isAfk && ((!message.jid.includes('-')) || (message.jid.includes('-') && 
            (( message.mention !== false && message.mention.length !== 0 ) || message.reply_message !== false)))) {
            if (message.jid.includes('-') && (message.mention !== false && message.mention.length !== 0)) {
                message.mention.map(async (jid) => {
                    if (message.client.user.jid.split('@')[0] === jid.split('@')[0]) {
                        await message.client.sendMessage(message.jid,Config.AFKMSG + '\n' + 
                        (AFK.reason !== false ? '\n*' + Lang.REASON + ':* ```' + AFK.reason + '```' : '') + 
                        (AFK.lastseen !== 0 ? '\n*' + Lang.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + ' once```' : ''), MessageType.text, {quoted: message.data});            
                    }
                })
            } else if (message.jid.includes('-') && message.reply_message !== false) {
                if (message.reply_message.jid.split('@')[0] === message.client.user.jid.split('@')[0]) {
                    await message.client.sendMessage(message.jid,Config.AFKMSG + '\n' + 
                        (AFK.reason !== false ? '\n*' + Lang.REASON + ':* ```' + AFK.reason + '```' : '') + 
                        (AFK.lastseen !== 0 ? '\n*' + Lang.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + ' once```' : ''), MessageType.text, {quoted: message.data});
                }
            } else {
                await message.client.sendMessage(message.jid,Config.AFKMSG + '\n' + 
                (AFK.reason !== false ? '\n*' + Lang.REASON + ':* ```' + AFK.reason + '```' : '') + 
                (AFK.lastseen !== 0 ? '\n*' + Lang.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + ' once```' : ''), MessageType.text, {quoted: message.data});
            }
        }
    }
}));

Bot.addCommand({pattern: 'afk ?(.*)', fromMe: true, deleteCommand: false, desc: Lang.AFK_DESC}, (async (message, match) => {     
function _0x1ab2(){var _0x5c95ae=['30149biFGtG','isAfk','client','sendMessage','1490936GkOEEn','26424qUQjVr','950eIjlzY','reason','114726xrPMdR','includes','IM_NOT_AFK','lastseen','2129sOQHcr','```','4uecjtE','jid','REASON','getTime','4TywwsA','358146UUMcvq','IM_AFK','text','quit','482750FzwPgy'];_0x1ab2=function(){return _0x5c95ae;};return _0x1ab2();}var _0x372d6c=_0x4843;function _0x4843(_0x1bb166,_0x2d696c){var _0x1ab2c3=_0x1ab2();return _0x4843=function(_0x4843ae,_0x1295fe){_0x4843ae=_0x4843ae-0xe2;var _0x438c90=_0x1ab2c3[_0x4843ae];return _0x438c90;},_0x4843(_0x1bb166,_0x2d696c);}(function(_0x4f818f,_0x3569d9){var _0x15f272=_0x4843,_0x3dc46b=_0x4f818f();while(!![]){try{var _0x260400=-parseInt(_0x15f272(0xf7))/0x1*(-parseInt(_0x15f272(0xf9))/0x2)+parseInt(_0x15f272(0xe6))/0x3*(parseInt(_0x15f272(0xe5))/0x4)+parseInt(_0x15f272(0xea))/0x5+-parseInt(_0x15f272(0xf3))/0x6+-parseInt(_0x15f272(0xeb))/0x7+parseInt(_0x15f272(0xef))/0x8+-parseInt(_0x15f272(0xf0))/0x9*(parseInt(_0x15f272(0xf1))/0xa);if(_0x260400===_0x3569d9)break;else _0x3dc46b['push'](_0x3dc46b['shift']());}catch(_0x494e76){_0x3dc46b['push'](_0x3dc46b['shift']());}}}(_0x1ab2,0x19711));if(!AFK[_0x372d6c(0xec)])AFK['lastseen']=Math['round'](new Date()[_0x372d6c(0xe4)]()/0x3e8),match[0x1]!==''&&(AFK[_0x372d6c(0xf2)]=match[0x1]),AFK[_0x372d6c(0xec)]=!![],await message['client'][_0x372d6c(0xee)](message['jid'],Lang[_0x372d6c(0xe7)]+(AFK[_0x372d6c(0xf2)]!==![]?'\x0a*'+Lang[_0x372d6c(0xe3)]+':*\x20```'+AFK[_0x372d6c(0xf2)]+_0x372d6c(0xf8):''),MessageType[_0x372d6c(0xe8)],{'quoted':message['data']});else AFK[_0x372d6c(0xec)]&&match[0x1][_0x372d6c(0xf4)](_0x372d6c(0xe9))&&(AFK[_0x372d6c(0xf6)]=0x0,AFK['reason']=![],AFK[_0x372d6c(0xec)]=![],await message[_0x372d6c(0xed)][_0x372d6c(0xee)](message[_0x372d6c(0xe2)],Lang[_0x372d6c(0xf5)],MessageType['text'],{'contextInfo':{'forwardingScore':0x3e8,'isForwarded':!![]}}));
}));

module.exports = { secondsToHms };
