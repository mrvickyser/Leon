let Bot = require('../events');
let {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
let fs = require('fs');
let Config = require('../config');
let axios = require('axios');
let request = require('request');
let got = require("got");
let QRReader = require('qrcode-reader');
let jimp = require('jimp');
let Language = require('../language');
let Lang = Language.getString('ttp');

if (Config.WORKTYPE == 'private') {
    
    Bot.addCommand({pattern: 'qr ?(.*)', fromMe: true, desc: Lang.QR_DESC}, (async (message, match) => {

        if (match[1] === '') return await message.sendReply(Lang.NEED_WORD);

        var webimage = await axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${match[1].replace(/#/g, '\n')} `, { responseType: 'arraybuffer' })

        await message.sendImage(Buffer.from(webimage.data), '*Made By Leon*');

    }));

    Bot.addCommand({pattern: 'readqr ?(.*)', fromMe: true, desc: Lang.QR_DESC}, (async (message, match) => {

    var _0x502fb8=_0x36ac;(function(_0x54862e,_0x1271a0){var _0x27bec4=_0x36ac,_0x3f97d2=_0x54862e();while(!![]){try{var _0xae1eeb=parseInt(_0x27bec4(0x7d))/0x1+-parseInt(_0x27bec4(0x91))/0x2*(-parseInt(_0x27bec4(0x8c))/0x3)+parseInt(_0x27bec4(0x7e))/0x4+parseInt(_0x27bec4(0x85))/0x5*(parseInt(_0x27bec4(0x89))/0x6)+-parseInt(_0x27bec4(0x7f))/0x7*(parseInt(_0x27bec4(0x87))/0x8)+parseInt(_0x27bec4(0x8f))/0x9+parseInt(_0x27bec4(0x8d))/0xa*(-parseInt(_0x27bec4(0x95))/0xb);if(_0xae1eeb===_0x1271a0)break;else _0x3f97d2['push'](_0x3f97d2['shift']());}catch(_0x18bd16){_0x3f97d2['push'](_0x3f97d2['shift']());}}}(_0x153d,0xc793a));if(!message[_0x502fb8(0x93)]||!message[_0x502fb8(0x93)][_0x502fb8(0x83)])return await message[_0x502fb8(0x82)](Lang[_0x502fb8(0x84)]);var downloading=await message[_0x502fb8(0x82)](Lang[_0x502fb8(0x92)]),location=await message[_0x502fb8(0x88)][_0x502fb8(0x7c)]({'key':{'remoteJid':message['reply_message'][_0x502fb8(0x8b)],'id':message['reply_message']['id']},'message':message[_0x502fb8(0x93)]['data'][_0x502fb8(0x90)]});let img=await jimp[_0x502fb8(0x81)](location),qr=new QRReader();function _0x36ac(_0x4c4efa,_0x1ae434){var _0x153d8b=_0x153d();return _0x36ac=function(_0x36ac05,_0x308298){_0x36ac05=_0x36ac05-0x7c;var _0x35d574=_0x153d8b[_0x36ac05];return _0x35d574;},_0x36ac(_0x4c4efa,_0x1ae434);}qr[_0x502fb8(0x86)]=async(_0x1ba0ad,_0x1e79c2)=>{var _0x5cdc36=_0x502fb8;if(_0x1ba0ad)return await message['sendReply'](_0x1ba0ad);return await message[_0x5cdc36(0x82)](Lang[_0x5cdc36(0x94)]+_0x5cdc36(0x8e)+_0x1e79c2[_0x5cdc36(0x8a)]+'*');},qr[_0x502fb8(0x80)](img['bitmap']);function _0x153d(){var _0xeb1c91=['512886ywKrHk','downloadAndSaveMediaMessage','1417640eLVbCT','2954504pCqxWJ','2107LQDgjo','decode','read','sendReply','image','NEED_IMAGE','16655KAcQjV','callback','23088iUWNPu','client','2190KyCZFt','result','jid','465yGSxxg','730pfppbY','\x0a\x20*','12529026NwsyZQ','quotedMessage','4202tdYxWx','RQ_PROC','reply_message','SUC_READ'];_0x153d=function(){return _0xeb1c91;};return _0x153d();}
    }));
}
else if (Config.WORKTYPE == 'public') {
    
    Bot.addCommand({pattern: 'qr ?(.*)', fromMe: false, desc: Lang.QR_DESC}, (async (message, match) => {

        if (match[1] === '') return await message.sendReply(Lang.NEED_WORD);

        var webimage = await axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${match[1].replace(/#/g, '\n')} `, { responseType: 'arraybuffer' })

        await message.sendImage(Buffer.from(webimage.data), '*Made By Leon*');

    }));

    Bot.addCommand({pattern: 'readqr ?(.*)', fromMe: false, desc: Lang.QR_DESC}, (async (message, match) => {

    var _0x502fb8=_0x36ac;(function(_0x54862e,_0x1271a0){var _0x27bec4=_0x36ac,_0x3f97d2=_0x54862e();while(!![]){try{var _0xae1eeb=parseInt(_0x27bec4(0x7d))/0x1+-parseInt(_0x27bec4(0x91))/0x2*(-parseInt(_0x27bec4(0x8c))/0x3)+parseInt(_0x27bec4(0x7e))/0x4+parseInt(_0x27bec4(0x85))/0x5*(parseInt(_0x27bec4(0x89))/0x6)+-parseInt(_0x27bec4(0x7f))/0x7*(parseInt(_0x27bec4(0x87))/0x8)+parseInt(_0x27bec4(0x8f))/0x9+parseInt(_0x27bec4(0x8d))/0xa*(-parseInt(_0x27bec4(0x95))/0xb);if(_0xae1eeb===_0x1271a0)break;else _0x3f97d2['push'](_0x3f97d2['shift']());}catch(_0x18bd16){_0x3f97d2['push'](_0x3f97d2['shift']());}}}(_0x153d,0xc793a));if(!message[_0x502fb8(0x93)]||!message[_0x502fb8(0x93)][_0x502fb8(0x83)])return await message[_0x502fb8(0x82)](Lang[_0x502fb8(0x84)]);var downloading=await message[_0x502fb8(0x82)](Lang[_0x502fb8(0x92)]),location=await message[_0x502fb8(0x88)][_0x502fb8(0x7c)]({'key':{'remoteJid':message['reply_message'][_0x502fb8(0x8b)],'id':message['reply_message']['id']},'message':message[_0x502fb8(0x93)]['data'][_0x502fb8(0x90)]});let img=await jimp[_0x502fb8(0x81)](location),qr=new QRReader();function _0x36ac(_0x4c4efa,_0x1ae434){var _0x153d8b=_0x153d();return _0x36ac=function(_0x36ac05,_0x308298){_0x36ac05=_0x36ac05-0x7c;var _0x35d574=_0x153d8b[_0x36ac05];return _0x35d574;},_0x36ac(_0x4c4efa,_0x1ae434);}qr[_0x502fb8(0x86)]=async(_0x1ba0ad,_0x1e79c2)=>{var _0x5cdc36=_0x502fb8;if(_0x1ba0ad)return await message['sendReply'](_0x1ba0ad);return await message[_0x5cdc36(0x82)](Lang[_0x5cdc36(0x94)]+_0x5cdc36(0x8e)+_0x1e79c2[_0x5cdc36(0x8a)]+'*');},qr[_0x502fb8(0x80)](img['bitmap']);function _0x153d(){var _0xeb1c91=['512886ywKrHk','downloadAndSaveMediaMessage','1417640eLVbCT','2954504pCqxWJ','2107LQDgjo','decode','read','sendReply','image','NEED_IMAGE','16655KAcQjV','callback','23088iUWNPu','client','2190KyCZFt','result','jid','465yGSxxg','730pfppbY','\x0a\x20*','12529026NwsyZQ','quotedMessage','4202tdYxWx','RQ_PROC','reply_message','SUC_READ'];_0x153d=function(){return _0xeb1c91;};return _0x153d();}
    }));
}
