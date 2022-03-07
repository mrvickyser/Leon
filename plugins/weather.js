let Bot = require('../events');
let {MessageType} = require('@adiwajshing/baileys');
let got = require('got');
let fs = require('fs');
let Config = require('../config');
let Language = require('../language');
let Lang = Language.getString('weather');

if (Config.WORKTYPE == 'private') {

    Bot.addCommand({pattern: 'weather ?(.*)', desc: Lang.WEATHER_DESC, fromMe: true}, async (message, match) => {

	    if (match[1] === '') return await message.sendReply(Lang.NEED_LOCATION);
	    const url = `${Config.API}/weather?place=${match[1]}`;
	    try {
		    const response = await got(url);
		    const json = JSON.parse(response.body);
		    if (response.statusCode === 200) return await message.sendReply('*📍 ' + Lang.LOCATION +':* ```' + match[1] + '```\n\n' +
		    '*☀️ ' + Lang.TEMP +':* ```' + json.result.max_temp + '°```\n' + 
		    '*💬 ' + Lang.DESC +':* ```' + json.result.weather_desc + '```\n' +
		    '*☀ ' + Lang.HUMI +':* ```%' + json.result.humidity + '```\n' + 
		    '*💨 ' + Lang.WIND +':* ```' + json.result.wind_speed + 'm/s```\n' + 
		    '*☁ ' + Lang.CLOUD +':* ```%' + json.result.clouds + '```\n' +
                    '*♦️ ' + Lang.PRESSURE + ':* ```%' + json.result.pressure + '```\n' +
                    '*📉 ' + Lang.LAT + ':* ```' + json.result.latitude + '```\n' +
                    '*📈 ' + Lang.LON + ':* ```' + json.result.longitude + '```\n' +
                    '*🌅 ' + Lang.SR + ':* ```' + json.result.sunrise + '```\n' +
                    '*🌇 ' + Lang.SS + ':* ```' + json.result.sunset + '```\n' +
                    '*⏱️ ' + Lang.TZ + ':* ```' + json.result.timezone + '```');
	    } catch {
		    return await message.sendReply(Lang.NOT_FOUND);
	    }
    });
}
if (Config.WORKTYPE == 'public') {

    Bot.addCommand({pattern: 'weather ?(.*)', desc: Lang.WEATHER_DESC, fromMe: false}, async (message, match) => {

	    if (match[1] === '') return await message.sendReply(Lang.NEED_LOCATION);
	    const url = `${Config.API}/weather?place=${match[1]}`;
	    try {
		    const response = await got(url);
		    const json = JSON.parse(response.body);
		    if (response.statusCode === 200) return await message.sendReply('*📍 ' + Lang.LOCATION +':* ```' + match[1] + '```\n\n' +
		    '*☀️ ' + Lang.TEMP +':* ```' + json.result.max_temp + '°```\n' + 
		    '*💬 ' + Lang.DESC +':* ```' + json.result.weather_desc + '```\n' +
		    '*☀ ' + Lang.HUMI +':* ```%' + json.result.humidity + '```\n' + 
		    '*💨 ' + Lang.WIND +':* ```' + json.result.wind_speed + 'm/s```\n' + 
		    '*☁ ' + Lang.CLOUD +':* ```%' + json.result.clouds + '```\n' +
                    '*♦️ ' + Lang.PRESSURE + ':* ```%' + json.result.pressure + '```\n' +
                    '*📉 ' + Lang.LAT + ':* ```' + json.result.latitude + '```\n' +
                    '*📈 ' + Lang.LON + ':* ```' + json.result.longitude + '```\n' +
                    '*🌅 ' + Lang.SR + ':* ```' + json.result.sunrise + '```\n' +
                    '*🌇 ' + Lang.SS + ':* ```' + json.result.sunset + '```\n' +
                    '*⏱️ ' + Lang.TZ + ':* ```' + json.result.timezone + '```');
	    } catch {
		    return await message.sendReply(Lang.NOT_FOUND);
	    }
    });
}
