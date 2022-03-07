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
	    const url = `http://api.openweathermap.org/data/2.5/weather?q=${match[1]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=tr`;
	    try {
		    const response = await got(url);
		    const json = JSON.parse(response.body);
		    if (response.statusCode === 200) return await message.sendReply('*📍 ' + Lang.LOCATION +':* ```' + match[1] + '```\n\n' +
		    '*☀ ' + Lang.TEMP +':* ```' + json.main.temp_max + '°```\n' + 
		    '*ℹ ' + Lang.DESC +':* ```' + json.weather[0].description + '```\n' +
		    '*☀ ' + Lang.HUMI +':* ```%' + json.main.humidity + '```\n' + 
		    '*💨 ' + Lang.WIND +':* ```' + json.wind.speed + 'm/s```\n' + 
		    '*☁ ' + Lang.CLOUD +':* ```%' + json.clouds.all + '```\n');
	    } catch {
		    return await message.sendReply(Lang.NOT_FOUND);
	    }
    });
}
if (Config.WORKTYPE == 'public') {

    Bot.addCommand({pattern: 'weather ?(.*)', desc: Lang.WEATHER_DESC, fromMe: false}, async (message, match) => {

	    if (match[1] === '') return await message.sendReply(Lang.NEED_LOCATION);
	    const url = `http://api.openweathermap.org/data/2.5/weather?q=${match[1]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=tr`;
	    try {
		    const response = await got(url);
		    const json = JSON.parse(response.body);
		    if (response.statusCode === 200) return await message.sendReply('*📍 ' + Lang.LOCATION +':* ```' + match[1] + '```\n\n' +
		    '*☀ ' + Lang.TEMP +':* ```' + json.main.temp_max + '°```\n' + 
		    '*ℹ ' + Lang.DESC +':* ```' + json.weather[0].description + '```\n' +
		    '*☀ ' + Lang.HUMI +':* ```%' + json.main.humidity + '```\n' + 
		    '*💨 ' + Lang.WIND +':* ```' + json.wind.speed + 'm/s```\n' + 
		    '*☁ ' + Lang.CLOUD +':* ```%' + json.clouds.all + '```\n');
	    } catch {
		    return await message.sendReply(Lang.NOT_FOUND);
	    }
    });
}
