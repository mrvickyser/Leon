let Bot = require('../events');
let {MessageType,Mimetype} = require('@adiwajshing/baileys');
let fs = require('fs');
let ffmpeg = require('fluent-ffmpeg');
let {execFile} = require('child_process');
let cwebp = require('cwebp-bin');
let Config = require('../config');
let Language = require('../language');
let Lang = Language.getString('unvoice');

if (Config.WORKTYPE == 'private') {

    Bot.addCommand({pattern: 'unvoice', fromMe: true, desc: Lang.UV_DESC}, (async (message, match) => {    

        if (message.reply_message === false) return await message.sendReply(Lang.UV_REPLY);
        var downloading = await message.sendReply(Lang.UV_PROC);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .format('mp3')
            .save('output.mp3')
            .on('end', async () => {
                await message.sendAudio(fs.readFileSync('output.mp3'));
            });
        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
    
    Bot.addCommand({pattern: 'unaudio', fromMe: true, desc: Lang.UA_DESC}, (async (message, match) => {    

        if (message.reply_message === false) return await message.sendReply(Lang.UA_REPLY);
        var downloading = await message.sendReply(Lang.UA_PROC);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .withNoVideo()
            .save('output.mp3')
            .on('end', async () => {
                await message.sendAudio(fs.readFileSync('output.mp3'));
            });
        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
}
else if (Config.WORKTYPE == 'public') {

    Bot.addCommand({pattern: 'unvoice', fromMe: false, desc: Lang.UV_DESC}, (async (message, match) => {    

        if (message.reply_message === false) return await message.sendReply(Lang.UV_REPLY);
        var downloading = await message.sendReply(Lang.UV_PROC);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .format('mp3')
            .save('output.mp3')
            .on('end', async () => {
                await message.sendAudio(fs.readFileSync('output.mp3'));
            });
        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
    
    Bot.addCommand({pattern: 'unaudio', fromMe: false, desc: Lang.UA_DESC}, (async (message, match) => {    

        if (message.reply_message === false) return await message.sendReply(Lang.UA_REPLY);
        var downloading = await message.sendReply(Lang.UA_PROC);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .withNoVideo()
            .save('output.mp3')
            .on('end', async () => {
                await message.sendAudio(fs.readFileSync('output.mp3'));
            });
        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
}
