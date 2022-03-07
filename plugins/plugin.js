let Bot = require('../events');
let Heroku = require('heroku-client');
let Config = require('../config');
let {MessageType} = require('@adiwajshing/baileys');
let got = require('got');
let fs = require('fs');
let Db = require('./sql/plugin');
let Language = require('../language');
let Lang = Language.getString('plugin');
let NLang = Language.getString('updater');

const heroku = new Heroku({
    token: Config.HEROKU.API_KEY
});


let baseURI = '/apps/' + Config.HEROKU.APP_NAME;

Bot.addCommand({pattern: 'insert ?(.*)', fromMe: true, desc: Lang.INSTALL_DESC}, (async (message, match) => {
    if (match[1] === '') return await message.client.sendMessage(message.jid, Lang.NEED_URL, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
    try {
        var url = new URL(match[1]);
    } catch {
        return await message.sendReply(Lang.INVALID_URL);
    }
    
    if (url.host === 'gist.github.com') {
        url.host = 'gist.githubusercontent.com';
        url = url.toString() + '/raw'
    } else {
        url = url.toString()
    }

    var response = await got(url);
    if (response.statusCode == 200) {
        var plugin_name = response.body.match(/addCommand\({.*pattern: ["'](.*)["'].*}/);
        if (plugin_name.length >= 1) {
            plugin_name = "__" + plugin_name[1];
        } else {
            plugin_name = "__" + Math.random().toString(36).substring(8);
        }

        fs.writeFileSync('./plugins/' + plugin_name + '.js', response.body);
        try {
            require('./' + plugin_name);
        } catch (e) {
            fs.unlinkSync('/root/Leon/plugins/' + plugin_name + '.js')
            return await message.sendReply(Lang.INVALID_PLUGIN + ' ```' + e + '```');
        }

        await Db.installPlugin(url, plugin_name);
        await message.sendReply(Lang.INSTALLED);
    }
}));

Bot.addCommand({pattern: 'plugin', fromMe: true, desc: Lang.PLUGIN_DESC }, (async (message, match) => {
    var mesaj = Lang.INSTALLED_FROM_REMOTE;
    var plugins = await Db.PluginDB.findAll();
    if (plugins.length < 1) {
        return await message.sendReply(Lang.NO_PLUGIN);
    } else {
        plugins.map(
            (plugin) => {
                mesaj += '*' + plugin.dataValues.name + '*: ' + plugin.dataValues.url + '\n';
            }
        );
        return await message.sendReply(mesaj);
    }
}));

Bot.addCommand({pattern: 'remove(?: |$)(.*)', fromMe: true, desc: Lang.REMOVE_DESC}, (async (message, match) => {
    if (match[1] === '') return await message.client.sendMessage(message.jid, Lang.NEED_PLUGIN, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
    if (!match[1].startsWith('__')) match[1] = '__' + match[1];
    /*if (match[1].toLowerCase() === 'all') {
       await Db.PluginDB.findAll().map((p) => {
          await p[0].destroy();
          delete require.cache[require.resolve('./' + p + '.js')]
          fs.unlinkSync('./plugins/' + p + '.js');
       });
      await message.sendMessage(message.jid, "✅️ Successfully deleted all plugins!", MessageType.text);
      await message.sendReply(NLang.AFTER_UPDATE);

        console.log(baseURI);
        await heroku.delete(baseURI + '/dynos').catch(async (error) => {
            await message.sendReply(error.message);

        });
    }*/
    var plugin = await Db.PluginDB.findAll({ where: {name: match[1]} });
    if (plugin.length < 1) {
        return await message.sendReply(Lang.NOT_FOUND_PLUGIN);
    } else {
        await plugin[0].destroy();
        delete require.cache[require.resolve('./' + match[1] + '.js')]
        fs.unlinkSync('./plugins/' + match[1] + '.js');
        await message.sendReply(Lang.DELETED);
        await message.sendReply(NLang.AFTER_UPDATE);

        console.log(baseURI);
        await heroku.delete(baseURI + '/dynos').catch(async (error) => {
            await message.sendReply(error.message);

        });
    }

}));
