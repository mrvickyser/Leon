let Bot = require('../events');
let {MessageType} = require('@adiwajshing/baileys');
let Config = require('../config');
let got = require('got');
let td = Config.WORKTYPE == 'public' ? false : true

var QUOTE_DESC = ''
var QUOTE = ''
var AUTHOR = ''
var NOT_FOUND = ''
if (Config.LANG == 'EN') QUOTE_DESC = "Sends random quotes in english.", QUOTE = "```Quote:```", AUTHOR = "```Author:```", NOT_FOUND = "*An Error Occurred!*"
if (Config.LANG == 'ML') QUOTE_DESC = "ഇംഗ്ലീഷിൽ ക്രമരഹിതമായ ഉദ്ധരണികൾ അയയ്ക്കുക.", QUOTE = "```ഉദ്ധരണി:```", AUTHOR = "```രചയിതാവ്:```", NOT_FOUND = "*ഒരു പിശക് സംഭവിച്ചു!*"
if (Config.LANG == 'ID') QUOTE_DESC = "Mengirim kutipan acak dalam bahasa Inggris.", QUOTE = "```Mengutip:```", AUTHOR = "```Pengarang:```", NOT_FOUND = "*Terjadi kesalahan!*"

Bot.addCommand({pattern: 'quote ?(.*)', fromMe: td, desc: QUOTE_DESC}, async (message, match) => {
	const url = `${Config.API}/random/quote`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendReply('📌 ' + QUOTE +' *' + json.quote + '*\n\n' + '✒️' + AUTHOR +' *' + json.author+ '*\n');
	} catch {
		return await message.sendReply(NOT_FOUND);
	}
});
