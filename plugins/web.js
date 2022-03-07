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

       await message.sendReply('*Ping -* ```' + (end - start) + 'ms```\n\n');
    }));

    Bot.addCommand({pattern: 'short ?(.*)', fromMe: true, desc: Lang.URL}, (async (message, match) => {

         if (match[1] === '') return await message.sendReply(SLang.LİNK);

         TinyURL.shorten(`${match[1]}`, async(res, err) => {
           if (err)
             await message.sendReply('*#### Error! ####*\n\n' + '```' + err + '```');

             await message.sendReply(`*Original Link:* ${match[1]}\n*Short Link:* ` + res);
         });
    }));
}
else if (Config.WORKTYPE == 'public') {
    
    Bot.addCommand({pattern: 'ping', fromMe: false, deleteCommand: false, desc: Lang.PING_DESC}, (async (message, match) => {
       var start = new Date().getTime();
       var end = new Date().getTime();

       await message.sendReply('*Ping -* ```' + (end - start) + 'ms```\n\n');
    }));

    Bot.addCommand({pattern: 'short ?(.*)', fromMe: false, desc: Lang.URL}, (async (message, match) => {

         if (match[1] === '') return await message.sendReply(SLang.LİNK);

         TinyURL.shorten(`${match[1]}`, async(res, err) => {
           if (err)
             await message.sendReply('*#### Error! ####*\n\n' + '```' + err + '```');

             await message.sendReply(`*Original Link:* ${match[1]}\n*Short Link:* ` + res);
         });
    }));
}
