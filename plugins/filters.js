let Bot = require('../events');
let {MessageType} = require('@adiwajshing/baileys');
let fs = require('fs')
let conf = require('../config');
let FilterDb = require('./sql/filters');
let Language = require('../language');
let Lang = Language.getString('filters');
let Heroku = require('heroku-client');
const heroku = new Heroku({
    token: conf.HEROKU.API_KEY
});

let baseURI = '/apps/' + conf.HEROKU.APP_NAME;

Bot.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data})
        } else {
            var mesaj = Lang.FILTERS + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.client.sendMessage(message.jid,mesaj,MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data})
        }
    } else {
        if (match.length < 2) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
        }
        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, ''), match[0][0] === "'" ? true : false);
        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
    }
}));

Bot.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data})
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data})
    } else {
        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data})
    }
}));


Bot.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
            }
        }
    );
}));
