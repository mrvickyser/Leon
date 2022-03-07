let Bot = require('../events');
let {MessageType} = require('@adiwajshing/baileys');
let fs = require('fs');
let got = require('got');
let Config = require('../config');
let td = Config.WORKTYPE == 'public' ? false : true
let Language = require('../language');
let Lang = Language.getString('ai');

Bot.addCommand({pattern: 'simi ?(.*)', fromMe: td, desc: Lang.SIMI_DESC}, async (message, match) => {
	
const _0x58652b=_0x5353;(function(_0x5c517c,_0x4afe0c){const _0x4da77c=_0x5353,_0x2b61d1=_0x5c517c();while(!![]){try{const _0x833690=-parseInt(_0x4da77c(0xca))/0x1*(-parseInt(_0x4da77c(0xc2))/0x2)+-parseInt(_0x4da77c(0xd3))/0x3+-parseInt(_0x4da77c(0xc4))/0x4+-parseInt(_0x4da77c(0xd7))/0x5+-parseInt(_0x4da77c(0xd5))/0x6*(parseInt(_0x4da77c(0xcd))/0x7)+-parseInt(_0x4da77c(0xd4))/0x8+-parseInt(_0x4da77c(0xc3))/0x9*(-parseInt(_0x4da77c(0xd0))/0xa);if(_0x833690===_0x4afe0c)break;else _0x2b61d1['push'](_0x2b61d1['shift']());}catch(_0x57c4f1){_0x2b61d1['push'](_0x2b61d1['shift']());}}}(_0x4af0,0x9a3d2));if(match[0x1]==='xx')return await message['client'][_0x58652b(0xce)](message[_0x58652b(0xc5)],Lang[_0x58652b(0xd1)],MessageType[_0x58652b(0xd6)],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message[_0x58652b(0xcc)]});function _0x4af0(){const _0x444676=['client','data','8484959KZNXmh','sendMessage','*\x20```','31920110wbpAnR','INVALID_REQ','BOT_DIVIDER','1449072TKQCyD','2485720lfzuZE','6DcmkFO','text','4049825cYNYlW','response','4824OoMinN','9NtwWyo','3357824WxbsYG','jid','messages','```\x0a\x0a','parse','https://api.simsimi.net/v2/?text=','454BczIkb'];_0x4af0=function(){return _0x444676;};return _0x4af0();}const url=_0x58652b(0xc9)+match[0x1]+'&lang=en&cf=true';function _0x5353(_0x25f6b7,_0x5ce862){const _0x4af01b=_0x4af0();return _0x5353=function(_0x53530c,_0x4beea6){_0x53530c=_0x53530c-0xc1;let _0x59a9b4=_0x4af01b[_0x53530c];return _0x59a9b4;},_0x5353(_0x25f6b7,_0x5ce862);}try{const response=await got(url),json=JSON[_0x58652b(0xc8)](response['body']);if(response['statusCode']===0xc8)return await message[_0x58652b(0xcb)][_0x58652b(0xce)](message[_0x58652b(0xc5)],'\x0a*🤖\x20'+Lang[_0x58652b(0xd2)]+_0x58652b(0xcf)+json[_0x58652b(0xc6)][0x0][_0x58652b(0xc1)]+_0x58652b(0xc7),MessageType['text'],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message['data']});}catch{return await message[_0x58652b(0xcb)][_0x58652b(0xce)](message['jid'],Lang['NOT_FOUND_RESPONSE'],MessageType[_0x58652b(0xd6)],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message[_0x58652b(0xcc)]});}
});
