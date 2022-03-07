let Bot = require('../events');
let Config = require('../config');
let {MessageType} = require('@adiwajshing/baileys');
let exec = require('child_process').exec;
let os = require("os");
let fs = require('fs');
let heroku = require('heroku-client');
let Language = require('../language');
let Lang = Language.getString('evaluators');

Bot.addCommand({pattern: 'termux ?(.*)', fromMe: true, desc: Lang.TERM_DESC}, (async (message, match) => {    
var _0x2b9b32=_0x4b4d;function _0x4b4d(_0x6bba1d,_0x144761){var _0xb477d2=_0xb477();return _0x4b4d=function(_0x4b4dcb,_0x1151d3){_0x4b4dcb=_0x4b4dcb-0x1ba;var _0x259ca1=_0xb477d2[_0x4b4dcb];return _0x259ca1;},_0x4b4d(_0x6bba1d,_0x144761);}(function(_0x5c8d92,_0x3a85f4){var _0xbd1ddf=_0x4b4d,_0x1ef456=_0x5c8d92();while(!![]){try{var _0x5f1bb3=-parseInt(_0xbd1ddf(0x1bb))/0x1*(-parseInt(_0xbd1ddf(0x1c9))/0x2)+-parseInt(_0xbd1ddf(0x1ba))/0x3+parseInt(_0xbd1ddf(0x1c1))/0x4+-parseInt(_0xbd1ddf(0x1c2))/0x5*(-parseInt(_0xbd1ddf(0x1c4))/0x6)+parseInt(_0xbd1ddf(0x1bc))/0x7*(-parseInt(_0xbd1ddf(0x1c6))/0x8)+-parseInt(_0xbd1ddf(0x1ca))/0x9+parseInt(_0xbd1ddf(0x1be))/0xa;if(_0x5f1bb3===_0x3a85f4)break;else _0x1ef456['push'](_0x1ef456['shift']());}catch(_0x4943c9){_0x1ef456['push'](_0x1ef456['shift']());}}}(_0xb477,0x4e1f8));var user=os[_0x2b9b32(0x1cd)]()[_0x2b9b32(0x1c3)];if(match[0x1]==='')return await message['client'][_0x2b9b32(0x1bd)](message['jid'],Lang[_0x2b9b32(0x1cc)],MessageType[_0x2b9b32(0x1cb)],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message[_0x2b9b32(0x1c7)]});function _0xb477(){var _0x18844c=['text','GIVE_ME_CODE','userInfo','1019340sKQFZI','10DdMYzs','1757zGguof','sendMessage','623490icVXbh','jid',':~#\x20','1978328BvAHms','3185665oWNczO','username','6ryRxnY','```','20248hEFMvd','data','client','64046JVyTSr','1973169nzEWdQ'];_0xb477=function(){return _0x18844c;};return _0xb477();}exec(match[0x1],async(_0x25476e,_0x386ada,_0x4b07d7)=>{var _0x22c3d8=_0x2b9b32;if(_0x25476e)return await message['client'][_0x22c3d8(0x1bd)](message['jid'],_0x22c3d8(0x1c5)+user+':~#\x20'+match[0x1]+'\x0a'+_0x25476e+_0x22c3d8(0x1c5),MessageType['text'],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message[_0x22c3d8(0x1c7)]});return await message[_0x22c3d8(0x1c8)][_0x22c3d8(0x1bd)](message[_0x22c3d8(0x1bf)],_0x22c3d8(0x1c5)+user+_0x22c3d8(0x1c0)+match[0x1]+'\x0a'+_0x386ada+_0x22c3d8(0x1c5),MessageType[_0x22c3d8(0x1cb)],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message[_0x22c3d8(0x1c7)]});});
}));

async function checkUsAdmin(message, user = message.data.participant) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {     
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}
async function checkImAdmin(message, user = message.client.user.jid) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {     
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}

var ldc = ''
if (Config.LANG == 'EN') ldc = '*⭕ Link Detected! ⭕*'
if (Config.LANG == 'ML') ldc = '*⭕ ലിങ്ക് കണ്ടെത്തി! ⭕*'
if (Config.LANG == 'ID') ldc = '*⭕ tautan terdeteksi! ⭕*'

Bot.addCommand({on: 'text', fromMe: false, deleteCommand: false}, (async (message, match) => {
    if (Config.ANTILINK == 'true' && message.jid !== '94768826133-1630756178@g.us') {
        let regex1 = new RegExp('http://')
        let regex2 = new RegExp('https://')
        if (regex1.test(message.message)) {
            var us = await checkUsAdmin(message)
            var im = await checkImAdmin(message)
            if (!im) return;
            if (us) return;
            await message.client.groupRemove(message.jid, [message.data.participant]);         
            await message.client.sendMessage(message.jid,ldc, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
        } 
        else if (regex2.test(message.message)) {
            var us = await checkUsAdmin(message)
            var im = await checkImAdmin(message)
            if (!im) return;
            if (us) return;
            await message.client.groupRemove(message.jid, [message.data.participant]);         
            await message.client.sendMessage(message.jid,ldc, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
        }
        else if (message.message.match(/((?:[.]com)\b)/i)) {
            var us = await checkUsAdmin(message)
            var im = await checkImAdmin(message)
            if (!im) return;
            if (us) return;
            await message.client.groupRemove(message.jid, [message.data.participant]);         
            await message.client.sendMessage(message.jid,ldc, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
        }
    }
}));

Bot.addCommand({pattern: 'pmsend ?(.*)', fromMe: true, desc: Lang.PMS_DESC}, (async (message, match) => {
function _0x1b16(_0x582a2a,_0x5d050c){const _0x32b9b9=_0x32b9();return _0x1b16=function(_0x1b1680,_0x4fb038){_0x1b1680=_0x1b1680-0xce;let _0x318a71=_0x32b9b9[_0x1b1680];return _0x318a71;},_0x1b16(_0x582a2a,_0x5d050c);}const _0x214a21=_0x1b16;(function(_0x448a2e,_0x5a5eb2){const _0x57638f=_0x1b16,_0x30bded=_0x448a2e();while(!![]){try{const _0x1863e1=parseInt(_0x57638f(0xdf))/0x1*(parseInt(_0x57638f(0xe2))/0x2)+parseInt(_0x57638f(0xdd))/0x3+parseInt(_0x57638f(0xd5))/0x4*(parseInt(_0x57638f(0xd8))/0x5)+parseInt(_0x57638f(0xde))/0x6+-parseInt(_0x57638f(0xcf))/0x7+parseInt(_0x57638f(0xda))/0x8+parseInt(_0x57638f(0xd6))/0x9*(-parseInt(_0x57638f(0xd7))/0xa);if(_0x1863e1===_0x5a5eb2)break;else _0x30bded['push'](_0x30bded['shift']());}catch(_0x46db7c){_0x30bded['push'](_0x30bded['shift']());}}}(_0x32b9,0xddcf4));if(!message[_0x214a21(0xd3)])return await message[_0x214a21(0xce)][_0x214a21(0xdb)](message[_0x214a21(0xd2)],Lang[_0x214a21(0xd9)],MessageType['text'],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message['data']});if(message[_0x214a21(0xd3)]&&match[0x1]=='')return await message[_0x214a21(0xce)]['sendMessage'](message[_0x214a21(0xd2)],Lang[_0x214a21(0xe0)],MessageType['text'],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message[_0x214a21(0xd4)]});let uspm=message[_0x214a21(0xd3)]['jid'];await message[_0x214a21(0xce)][_0x214a21(0xdb)](uspm,'『\x20'+Lang[_0x214a21(0xd1)]+_0x214a21(0xe1)+Lang[_0x214a21(0xd1)]+':\x20'+match[0x1],MessageType[_0x214a21(0xd0)],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]}}),await message[_0x214a21(0xce)][_0x214a21(0xdb)](message[_0x214a21(0xd2)],Lang[_0x214a21(0xdc)],MessageType[_0x214a21(0xd0)],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message[_0x214a21(0xd4)]});function _0x32b9(){const _0x40bc5f=['NEED_WORDS','\x20』\x0a\x0a','2ynedtW','client','5769603xmNvSC','text','MSG','jid','reply_message','data','5614036HvtAyH','7619058iaZBYw','30WINWeu','5XIrheq','NEED_REPLY','10647232SQbvjk','sendMessage','SUC_PMS','66696VAuRGv','445134ouZgHg','1441613mjOixd'];_0x32b9=function(){return _0x40bc5f;};return _0x32b9();}
}));
