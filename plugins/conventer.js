let Bot = require('../events');
let {MessageType,Mimetype} = require('@adiwajshing/baileys');
let fs = require('fs');
let ffmpeg = require('fluent-ffmpeg');
let {execFile} = require('child_process');
let cwebp = require('cwebp-bin');
let cheerio = require('cheerio');
let Axios = require('axios');
let FormData = require('form-data');
let Config = require('../config');
let Language = require('../language');
let Lang = Language.getString('conventer');

if (Config.WORKTYPE == 'private') {

    Bot.addCommand({pattern: 'mp3', fromMe: true, desc: Lang.MP4TOAUDİO_DESC}, (async (message, match) => {    

        if (message.reply_message === false) return await message.client.sendMessage(message.jid, Lang.MP4TOAUDİO_NEEDREPLY, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data })
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
                await message.client.sendMessage(message.jid, fs.readFileSync('output.mp3'), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: false, contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data })
          });
    }));

    Bot.addCommand({pattern: 'photo', fromMe: true, desc: Lang.STİCKER_DESC}, (async (message, match) => {   

        if (message.reply_message === false) return await message.client.sendMessage(message.jid, Lang.STİCKER_NEEDREPLY, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data })
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .fromFormat('webp_pipe')
            .save('output.jpg')
            .on('end', async () => {
                await message.client.sendMessage(message.jid, fs.readFileSync('output.jpg'), MessageType.image, {mimetype: Mimetype.png, caption: '*Made By Leon*', contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(message.jid ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "▣ 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗪𝗵𝗮𝘁𝘀𝗔𝗹𝗲𝘅𝗮 ▣", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./src/image/WhatsAlexa.png')}}}});
            });
    }));
}
else if (Config.WORKTYPE == 'public') {

    Bot.addCommand({pattern: 'mp3', fromMe: false, desc: Lang.MP4TOAUDİO_DESC}, (async (message, match) => {    

        if (message.reply_message === false) return await message.client.sendMessage(message.jid, Lang.MP4TOAUDİO_NEEDREPLY, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data })
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
                await message.client.sendMessage(message.jid, fs.readFileSync('output.mp3'), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: false, contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data })
          });
    }));

    Bot.addCommand({pattern: 'photo', fromMe: false, desc: Lang.STİCKER_DESC}, (async (message, match) => {   

        if (message.reply_message === false) return await message.client.sendMessage(message.jid, Lang.STİCKER_NEEDREPLY, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data })
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .fromFormat('webp_pipe')
            .save('output.jpg')
            .on('end', async () => {
                await message.client.sendMessage(message.jid, fs.readFileSync('output.jpg'), MessageType.image, {mimetype: Mimetype.png, caption: '*Made By Leon*', contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(message.jid ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "▣ 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗪𝗵𝗮𝘁𝘀𝗔𝗹𝗲𝘅𝗮 ▣", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./src/image/WhatsAlexa.png')}}}});
            });
    }));
}
