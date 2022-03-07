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
const _0x1c8061=_0x488d;function _0x488d(_0x184499,_0x6150a6){const _0x18cebf=_0x18ce();return _0x488d=function(_0x488d82,_0x497fe5){_0x488d82=_0x488d82-0x10a;let _0x157287=_0x18cebf[_0x488d82];return _0x157287;},_0x488d(_0x184499,_0x6150a6);}(function(_0x2bab4e,_0x6f9512){const _0x473e45=_0x488d,_0x3e3ac6=_0x2bab4e();while(!![]){try{const _0x49293f=parseInt(_0x473e45(0x110))/0x1+-parseInt(_0x473e45(0x11c))/0x2+-parseInt(_0x473e45(0x11f))/0x3+parseInt(_0x473e45(0x113))/0x4*(parseInt(_0x473e45(0x114))/0x5)+-parseInt(_0x473e45(0x10e))/0x6+-parseInt(_0x473e45(0x11e))/0x7+parseInt(_0x473e45(0x118))/0x8;if(_0x49293f===_0x6f9512)break;else _0x3e3ac6['push'](_0x3e3ac6['shift']());}catch(_0x2c6473){_0x3e3ac6['push'](_0x3e3ac6['shift']());}}}(_0x18ce,0xb83f4));function _0x1b16(_0x413acb,_0x345e33){const _0x58ec8c=_0x32b9();return _0x1b16=function(_0x2a46c3,_0x37ff5d){_0x2a46c3=_0x2a46c3-0xce;let _0x442d1d=_0x58ec8c[_0x2a46c3];return _0x442d1d;},_0x1b16(_0x413acb,_0x345e33);}function _0x18ce(){const _0x2d3565=['NEED_REPLY','*『\x20','1441613mjOixd','client','jid','shift','7722528TCYeOv','5XIrheq','856977DXPbKJ','7619058iaZBYw','text','4170388FEUGAh','5EXblnV','push','66696VAuRGv','reply_message','21411608KLkHap','30WINWeu','10647232SQbvjk','sendMessage','834124ZrUfRl','data','8083971QBJNCU','2887038zlwoaH','\x20』*\x0a\x0a','MSG','NEED_WORDS','5614036HvtAyH'];_0x18ce=function(){return _0x2d3565;};return _0x18ce();}const _0x214a21=_0x1b16;(function(_0x2788fc,_0x10ae02){const _0x19e010=_0x488d,_0x4fbae2=_0x1b16,_0x84d437=_0x2788fc();while(!![]){try{const _0x3b6172=parseInt(_0x4fbae2(0xdf))/0x1*(parseInt(_0x4fbae2(0xe2))/0x2)+parseInt(_0x4fbae2(0xdd))/0x3+parseInt(_0x4fbae2(0xd5))/0x4*(parseInt(_0x4fbae2(0xd8))/0x5)+parseInt(_0x4fbae2(0xde))/0x6+-parseInt(_0x4fbae2(0xcf))/0x7+parseInt(_0x4fbae2(0xda))/0x8+parseInt(_0x4fbae2(0xd6))/0x9*(-parseInt(_0x4fbae2(0xd7))/0xa);if(_0x3b6172===_0x10ae02)break;else _0x84d437[_0x19e010(0x115)](_0x84d437[_0x19e010(0x10d)]());}catch(_0x2721e0){_0x84d437['push'](_0x84d437[_0x19e010(0x10d)]());}}}(_0x32b9,0xddcf4));if(!message[_0x214a21(0xd3)])return await message[_0x214a21(0xce)][_0x214a21(0xdb)](message[_0x214a21(0xd2)],Lang[_0x214a21(0xd9)],MessageType['text'],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message[_0x1c8061(0x11d)]});if(message[_0x214a21(0xd3)]&&match[0x1]=='')return await message[_0x214a21(0xce)][_0x1c8061(0x11b)](message[_0x214a21(0xd2)],Lang[_0x214a21(0xe0)],MessageType[_0x1c8061(0x112)],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message[_0x214a21(0xd4)]});let uspm=message[_0x214a21(0xd3)][_0x1c8061(0x10c)];await message[_0x214a21(0xce)][_0x214a21(0xdb)](uspm,_0x1c8061(0x125)+Lang[_0x214a21(0xd1)]+_0x214a21(0xe1)+Lang[_0x214a21(0xd1)]+':\x20'+'*'+match[0x1]+'*',MessageType[_0x214a21(0xd0)],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]}}),await message[_0x214a21(0xce)][_0x214a21(0xdb)](message[_0x214a21(0xd2)],Lang[_0x214a21(0xdc)],MessageType[_0x214a21(0xd0)],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message[_0x214a21(0xd4)]});function _0x32b9(){const _0x23a409=_0x1c8061,_0x28049d=[_0x23a409(0x122),_0x23a409(0x120),'2ynedtW',_0x23a409(0x10b),'5769603xmNvSC',_0x23a409(0x112),_0x23a409(0x121),_0x23a409(0x10c),_0x23a409(0x117),_0x23a409(0x11d),_0x23a409(0x123),_0x23a409(0x111),_0x23a409(0x119),_0x23a409(0x10f),_0x23a409(0x124),_0x23a409(0x11a),_0x23a409(0x11b),'SUC_PMS',_0x23a409(0x116),'445134ouZgHg',_0x23a409(0x10a)];return _0x32b9=function(){return _0x28049d;},_0x32b9();}
}));
