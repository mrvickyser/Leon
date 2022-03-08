let Bot = require('../events');
let {MessageType} = require('@adiwajshing/baileys');
let TinyURL = require('tinyurl');
let fs = require('fs');
let Config = require('../config');
let Language = require('../language');
let Lang = Language.getString('web');
let SLang = Language.getString('webss');

if (Config.WORKTYPE == 'private') {

    Bot.addCommand({pattern: 'ping', fromMe: true, deleteCommand: false, desc: Lang.PING_DESC}, (async (message, match) => {
       var start = new Date().getTime();
       var end = new Date().getTime();

       await message.sendReply('```' + (end - start) + 'ms```');
    }));

    Bot.addCommand({pattern: 'short ?(.*)', fromMe: true, desc: Lang.URL}, (async (message, match) => {

         if (match[1] === '') return await message.sendReply(SLang.LİNK);

         TinyURL.shorten(`${match[1]}`, async(res, err) => {
           if (err)
             await message.sendReply('*#### Error! ####*\n\n' + '```' + err + '```');

             await message.sendReply(`*Original Link:* ${match[1]}\n*Short Link:* ` + res);
         });
    }));

    Bot.addCommand({pattern: 'fancy', fromMe: true, desc: Lang.FANCY_DESC}, (async (message, match) => {
        if (match[1] === '') return await message.sendReply(Lang.NEED_TEXT);
        if (match[1].length > 30) return await message.sendReply(Lang.MAX_TEXT);
        try {
          let url = await got(Config.API + '/fancy-text?text=' + encodeURI(match[1]));
          let json = JSON.parse(url.body);
          await message.sendReply("```" + json.result + "```");
        } catch (e) {
          await message.sendReply(Lang.ERROR);
        }
    }));
}
else if (Config.WORKTYPE == 'public') {
    
    Bot.addCommand({pattern: 'ping', fromMe: false, deleteCommand: false, desc: Lang.PING_DESC}, (async (message, match) => {
       var start = new Date().getTime();
       var end = new Date().getTime();

       await message.sendReply('```' + (end - start) + 'ms```');
    }));

    Bot.addCommand({pattern: 'short ?(.*)', fromMe: false, desc: Lang.URL}, (async (message, match) => {

         if (match[1] === '') return await message.sendReply(SLang.LİNK);

         TinyURL.shorten(`${match[1]}`, async(res, err) => {
           if (err)
             await message.sendReply('*#### Error! ####*\n\n' + '```' + err + '```');

             await message.sendReply(`*Original Link:* ${match[1]}\n*Short Link:* ` + res);
         });
    }));

    Bot.addCommand({pattern: 'fancy', fromMe: true, desc: Lang.FANCY_DESC}, (async (message, match) => {
        if (match[1] === '') return await message.sendReply(Lang.NEED_TEXT);
        if (match[1].length > 30) return await message.sendReply(Lang.MAX_TEXT);
        try {
          let url = await got(Config.API + '/fancy-text?text=' + encodeURI(match[1]));
          let json = JSON.parse(url.body);
          await message.sendReply("```" + json.result + "```");
        } catch (e) {
          await message.sendReply(Lang.ERROR);
        }
    }));
}
