let Bot = require('../events');
let {MessageType} = require('@adiwajshing/baileys');
let Config = require('../config');
let fs = require('fs');
let Language = require('../language');
let Lang = Language.getString('profile');

Bot.addCommand({pattern: 'leave', fromMe: true, desc: Lang.KICKME_DESC, onlyGroup: true}, (async (message, match) => {

    await message.sendReply(Lang.KICKME);
    await message.client.groupLeave(message.jid);
}));

Bot.addCommand({pattern: 'setpp', fromMe: true, desc: Lang.PP_DESC}, (async (message, match) => {    
    if (message.reply_message === false || message.reply_message.image === false) return await message.sendReply(Lang.NEED_PHOTO);

    var load = await message.sendReply(Lang.PPING);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    await message.client.updateProfilePicture(message.client.user.jid, fs.readFileSync(location));
    await load.delete();
}));

Bot.addCommand({pattern: 'block ?(.*)', fromMe: true, desc: Lang.BLOCK_DESC}, (async (message, match) => {    
    if (message.reply_message !== false) {
        await message.client.sendMessage(message.jid, '@' + message.reply_message.jid.split('@')[0] + '```, ' + Lang.BLOCKED + '!```', MessageType.text, {
            quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
        });
        await message.client.blockUser(message.reply_message.jid, "add");
    } else if (message.mention !== false) {
        message.mention.map(async user => {
            await message.client.sendMessage(message.jid, '@' + user.split('@')[0] + '```, ' + Lang.BLOCKED + '!```', MessageType.text, {
                previewType: 0, contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
            });
            await message.client.blockUser(user, "add");
        });
    } else if (!message.jid.includes('-')) {
        await message.client.sendMessage(message.jid, '*' + Lang.BLOCKED_UPPER + '*', MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
        await message.client.blockUser(message.jid, "add");
    } else {
        await message.client.sendMessage(message.jid, '*' + Lang.NEED_USER + '*', MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
    }
}));

Bot.addCommand({pattern: 'unblock ?(.*)', fromMe: true, desc: Lang.UNBLOCK_DESC}, (async (message, match) => {    
    if (message.reply_message !== false) {
        await message.client.blockUser(message.reply_message.jid, "remove");
        await message.client.sendMessage(message.jid, '@' + message.reply_message.jid.split('@')[0] + '```, ' + Lang.UNBLOCKED + '!```', MessageType.text, {
            quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
        });
    } else if (message.mention !== false) {
        message.mention.map(async user => {
            await message.client.blockUser(user, "remove");
            await message.client.sendMessage(message.jid, '@' + user.split('@')[0] + '```, ' + Lang.UNBLOCKED + '!```', MessageType.text, {
                contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
            });    
        });
    } else if (!message.jid.includes('-')) {
        await message.client.blockUser(message.jid, "remove");
        await message.client.sendMessage(message.jid, '*' + Lang.UNBLOCKED_UPPER + '*', MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
    } else {
        await message.client.sendMessage(message.jid, '*' + Lang.NEED_USER + '*', MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
    }
}));

if (Config.WORKTYPE == 'private') {

    Bot.addCommand({pattern: 'jid ?(.*)', fromMe: true, desc: Lang.JID_DESC}, (async (message, match) => {    
        if (message.reply_message !== false) {
            await message.client.sendMessage(message.jid, Lang.JID.format(message.reply_message.jid.split('@')[0], message.reply_message.jid), MessageType.text, {
                quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
            });
        } else if (message.mention !== false) {
            message.mention.map(async user => {
                await message.client.sendMessage(message.jid, Lang.JID.format(user.split('@')[0], user), MessageType.text, {
                    contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
                });    
            });
        } else {
            await message.client.sendMessage(message.jid, Lang.JID_CHAT.format(message.jid), MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
        }
    }));
}
else if (Config.WORKTYPE == 'public') {

    Bot.addCommand({pattern: 'jid ?(.*)', fromMe: false, desc: Lang.JID_DESC}, (async (message, match) => {    
        if (message.reply_message !== false) {
            await message.client.sendMessage(message.jid, Lang.JID.format(message.reply_message.jid.split('@')[0], message.reply_message.jid), MessageType.text, {
                quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
            });
        } else if (message.mention !== false) {
            message.mention.map(async user => {
                await message.client.sendMessage(message.jid, Lang.JID.format(user.split('@')[0], user), MessageType.text, {
                    contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
                });    
            });
        } else {
            await message.client.sendMessage(message.jid, Lang.JID_CHAT.format(message.jid), MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
        }
    }));
}
