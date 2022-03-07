const {MessageType, Presence, MessageOptions} = require('@adiwajshing/baileys');
const Base = require('./Base');
const Image = require('./Image');

class ReplyMessage extends Base {
    constructor(client, data) {
        super(client);
        if (data) this._patch(data);
    }

    _patch(data) {
        this.id = data.stanzaId;
        this.jid = data.participant;
        if (data.quotedMessage && data.quotedMessage.imageMessage) {
            this.message = data.quotedMessage.imageMessage.caption === null ? data.message.imageMessage.caption : '';
            this.caption = data.quotedMessage.imageMessage.caption === null ? data.message.imageMessage.caption : '';
            this.url = data.quotedMessage.imageMessage.url;
            this.mimetype = data.quotedMessage.imageMessage.mimetype;
            this.height = data.quotedMessage.imageMessage.height;
            this.width = data.quotedMessage.imageMessage.width;
            this.mediaKey = data.quotedMessage.imageMessage.mediaKey;
            this.image = true;
            this.video = false;
        } else if (data.quotedMessage && data.quotedMessage.videoMessage) {
            this.message = data.quotedMessage.videoMessage.caption === null ? data.message.videoMessage.caption : '';
            this.caption = data.quotedMessage.videoMessage.caption === null ? data.message.videoMessage.caption : '';
            this.url = data.quotedMessage.videoMessage.url;
            this.mimetype = data.quotedMessage.videoMessage.mimetype;
            this.height = data.quotedMessage.videoMessage.height;
            this.width = data.quotedMessage.videoMessage.width;
            this.mediaKey = data.quotedMessage.videoMessage.mediaKey;
            this.video = true;
        } else if (data.quotedMessage && data.quotedMessage.conversation) {
            this.message = data.quotedMessage.conversation;
            this.text = data.quotedMessage.conversation;
            this.image = false;
            this.video = false;
        }

        this.data = data;
                
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

    async download(location = this.id) {
        if (this.image) {
            await this.client.downloadAndSaveMediaMessage(this.data.quotedMessage.imageMessage, location);
            return this.id + '.' + this.mimetype.split('/')[1];    
        } else {
            return false;
        }
    }
};

module.exports = ReplyMessage;
