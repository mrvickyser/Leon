let {MessageType, GroupSettingChange, ChatModification, WAConnectionTest} = require('@adiwajshing/baileys');
let Bot = require('../events');
let fs = require('fs');
let Config = require('../config');
let Language = require('../language');
let Lang = Language.getString('clear');

Bot.addCommand({pattern: 'clear', fromMe: true, desc: Lang.CLR_DESC}, (async (message, match) => {

function _0x1aed(_0x4fad56,_0x2a1010){var _0x5b4a3c=_0x5b4a();return _0x1aed=function(_0x1aed28,_0xc6415f){_0x1aed28=_0x1aed28-0x91;var _0x49c08d=_0x5b4a3c[_0x1aed28];return _0x49c08d;},_0x1aed(_0x4fad56,_0x2a1010);}function _0x5b4a(){var _0x1547b8=['modifyChat','835770nmeHgo','704436UtIwwk','7039960wDUraf','1017936UynmOa','sendMessage','15UyFTea','1603007BESCGb','424989dKcQvk','jid','CLR_DONE','CLR_PROC','847746OUwFDy','client','data','text'];_0x5b4a=function(){return _0x1547b8;};return _0x5b4a();}var _0x3b6340=_0x1aed;(function(_0x42bbf4,_0x23871f){var _0x25a6b9=_0x1aed,_0x4697e1=_0x42bbf4();while(!![]){try{var _0x469abf=-parseInt(_0x25a6b9(0x9f))/0x1+parseInt(_0x25a6b9(0x98))/0x2+-parseInt(_0x25a6b9(0x99))/0x3+parseInt(_0x25a6b9(0x9b))/0x4+parseInt(_0x25a6b9(0x9d))/0x5*(-parseInt(_0x25a6b9(0x93))/0x6)+-parseInt(_0x25a6b9(0x9e))/0x7+parseInt(_0x25a6b9(0x9a))/0x8;if(_0x469abf===_0x23871f)break;else _0x4697e1['push'](_0x4697e1['shift']());}catch(_0x52003b){_0x4697e1['push'](_0x4697e1['shift']());}}}(_0x5b4a,0x3a849),await message['client'][_0x3b6340(0x9c)](message[_0x3b6340(0xa0)],Lang[_0x3b6340(0x92)],MessageType[_0x3b6340(0x96)],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message['data']}),await message[_0x3b6340(0x94)][_0x3b6340(0x97)](message[_0x3b6340(0xa0)],ChatModification['delete']),await message[_0x3b6340(0x94)]['sendMessage'](message[_0x3b6340(0xa0)],Lang[_0x3b6340(0x91)],MessageType['text'],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message[_0x3b6340(0x95)]}));

}));
