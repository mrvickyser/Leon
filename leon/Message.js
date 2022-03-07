const {MessageType, Presence, MessageOptions} = require('@adiwajshing/baileys');
const Base = require('./Base');
const ReplyMessage = require('./ReplyMessage');

class Message extends Base {
    constructor(client, data) {
        super(client);
        if (data) this._patch(data);
    }

    _patch(data) {
        this.id = data.key.id === undefined ? undefined : data.key.id;
        this.jid = data.key.remoteJid;
        this.fromMe = data.key.fromMe;
        this.message = data.message.extendedTextMessage === null ? data.message.conversation : data.message.extendedTextMessage.text;
        this.unreadCount = data.unreadCount;
        this.timestamp = typeof(data.messageTimestamp) === 'object' ? data.messageTimestamp.low : data.messageTimestamp;
        this.data = data;
        
        if (data.message.hasOwnProperty('extendedTextMessage') &&
                data.message.extendedTextMessage.hasOwnProperty('contextInfo') === true && 
                data.message.extendedTextMessage.contextInfo.hasOwnProperty('quotedMessage')) { 
            this.reply_message = new ReplyMessage(this.client, data.message.extendedTextMessage.contextInfo); } else {
                this.reply_message = false;
            }
        
        if (data.message.hasOwnProperty('extendedTextMessage') &&
        data.message.extendedTextMessage.hasOwnProperty('contextInfo') === true && 
        data.message.extendedTextMessage.contextInfo.hasOwnProperty('mentionedJid')) {
            this.mention = data.message.extendedTextMessage.contextInfo.mentionedJid;
        } else {
            this.mention = false;
        }
        
        return super._patch(data);
    }

    async delete() {
        return await this.client.deleteMessage(this.jid, {id: this.id, remoteJid: this.jid, fromMe: true})
    }

    async sendReply(text) {
        var message = await this.client.sendMessage(this.jid, text, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: this.data})
        return new Message(this.client, message)
    }

    async sendMessage(content, type, options) {
        return await this.client.sendMessage(this.jid, content, type, options)
    }

    async sendImage(image, cap) {
        return await this.client.sendMessage(this.jid, image, MessageType.image, {mimetype: Mimetype.png, contextInfo: { forwardingScore: 49, isForwarded: true }, caption: cap, quoted: this.data})
    }

    async sendImageAsViewonce(image, cap) {
        return await this.client.sendMessage(this.jid, image, MessageType.image, {mimetype: Mimetype.png, contextInfo: { forwardingScore: 49, isForwarded: true }, caption: cap, readViewOnce: true, quoted: this.data})
    }

    async sendVideo(video, cap) {
        return await this.client.sendMessage(this.jid, video, MessageType.video, {mimetype: Mimetype.mp4, caption: cap, contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: this.data})
    }

    async sendVideoAsViewonce(video, cap) {
        return await this.client.sendMessage(this.jid, video, MessageType.video, {mimetype: Mimetype.mp4, caption: cap, contextInfo: { forwardingScore: 49, isForwarded: true }, readViewOnce: true, quoted: this.data})
    }

    async sendVideoAsGif(gif, cap) {
        return await this.client.sendMessage(this.jid, gif, MessageType.video, {mimetype: Mimetype.gif, caption: cap, contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: this.data})
    }

    async sendAudio(audio) {
        return await this.client.sendMessage(this.jid, audio, MessageType.audio, {mimetype: Mimetype.mp4Audio, contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: this.data})
    }

    async sendAudioAsVoice(voice) {
        return await this.client.sendMessage(this.jid, voice, MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: true, quoted: this.data})
    }

    async sendUnread() {
        return await this.client.chatRead(this.jid, 'unread')
    }

    async sendTyping() {
        return await this.client.updatePresence(this.jid, Presence.composing) ;
    }

    async sendRecording() {
        return await this.client.updatePresence(this.jid, Presence.recording) ;
    }

    async sendOnline() {
        return await this.client.updatePresence(this.jid, Presence.available) ;
    }

    async sendOffline() {
        return await this.client.updatePresence(this.jid, Presence.unavailable) ;
    }

    async sendRead() {
        return await this.client.chatRead(this.jid);
    }
};

module.exports = Message;
