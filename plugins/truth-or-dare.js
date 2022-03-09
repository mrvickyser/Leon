let Bot = require('../events');
let {MessageType} = require('@adiwajshing/baileys');
let Config = require('../config');
let got = require('got');
let t = Config.WORKTYPE == 'public' ? false : true

var TD = ''
var DD = ''
var NOT_FOUND = ''
if (Config.LANG == 'EN') TD = 'Sends random truths to play truth or dare.', DD = 'Sends random dares to play truth or dare.', NOT_FOUND = '*An error occurred!*'
if (Config.LANG == 'ML') TD = 'ട്രൂത് ഓർ ഡെയർ കളിക്കാനായി ക്രമരഹിതമായ ട്രൂത് കൾ അയക്കുന്നു.', DD = 'ട്രൂത് ഓർ ഡെയർ കളിക്കാനായി ക്രമരഹിതമായ ഡെയറുകൾ അയക്കുന്നു.', NOT_FOUND = '*ഒരു പിശക് സംഭവിച്ചു!*'
if (Config.LANG == 'ID') TD = 'Mengirim truths acak untuk memainkan truth or dare.', DD = 'Mengirim dares acak untuk memainkan truth or dare.', NOT_FOUND = '*Terjadi kesalahan!*'

Bot.addCommand({pattern: 'truth ?(.*)', fromMe: t, desc: TD}, async (message, match) => {
	const url = `${Config.API}/truth-or-dare/truth`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) {
                  var img = ["https://textpro.me/images/user_image/2022/03/62273769d4a13.jpg","https://textpro.me/images/user_image/2022/03/6227386833199.jpg","https://textpro.me/images/user_image/2022/03/62273c72cf61c.jpg","https://textpro.me/images/user_image/2022/03/62273dcf5298b.jpg","https://textpro.me/images/user_image/2022/03/62273e1d9615b.jpg"]
                  img = img[Math.floor(Math.random() * img.length)];
                  await message.sendImage(img, json.result.truth + "\n\n*Powered by TOXIC DEVIL API*");
                }
	} catch {
		return await message.sendReply(NOT_FOUND);
	}
});

Bot.addCommand({pattern: 'dare ?(.*)', fromMe: t, desc: DD}, async (message, match) => {
	const url = `${Config.API}/truth-or-dare/dare`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) {
                  var im = ["https://textpro.me/images/user_image/2022/03/622737980b5bf.jpg","https://textpro.me/images/user_image/2022/03/6227388cd2322.jpg","https://textpro.me/images/user_image/2022/03/62273c991c857.jpg","https://textpro.me/images/user_image/2022/03/62273df45a131.jpg","https://textpro.me/images/user_image/2022/03/62273e42aae86.jpg"]
                  im = im[Math.floor(Math.random() * im.length)];
                  await message.sendImage(im, json.result.dare + "\n\n*Powered by TOXIC DEVIL API*");
                }
	} catch {
		return await message.sendReply(NOT_FOUND);
	}
});
