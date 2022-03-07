let Bot = require('../events');
let Config = require('../config');
let Heroku = require('heroku-client');
let {secondsToHms} = require('./afk');
let got = require('got');
let fs = require('fs');
let {MessageType} = require('@adiwajshing/baileys');
let Language = require('../language');
let Lang = Language.getString('heroku');

let heroku = new Heroku({
    token: Config.HEROKU.API_KEY
});


let baseURI = '/apps/' + Config.HEROKU.APP_NAME;

Bot.addCommand({pattern: 'restart', fromMe: true, desc: Lang.RESTART_DESC}, (async (message, match) => {

    await message.sendReply(Lang.RESTART_MSG);
    console.log(baseURI);
    await heroku.delete(baseURI + '/dynos').catch(async (error) => {
        await message.sendReply(error.message);
    });
}));

Bot.addCommand({pattern: 'shutdown', fromMe: true, desc: Lang.SHUTDOWN_DESC}, (async(message, match) => {

    await heroku.get(baseURI + '/formation').then(async (formation) => {
        forID = formation[0].id;
        await message.sendReply(Lang.SHUTDOWN_MSG);
        await heroku.patch(baseURI + '/formation/' + forID, {
            body: {
                quantity: 0
            }
        });
    }).catch(async (err) => {
        await message.sendReply(error.message);
    });
}));

Bot.addCommand({pattern: 'editvar ?(.*)', fromMe: true, desc: Lang.SETVAR_DESC}, (async(message, match) => {

    if (match[1] === '') return await message.sendReply(Lang.KEY_VAL_MISSING);

    if ((varKey = match[1].split(':')[0]) && (varValue = match[1].split(':')[1])) {
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                [varKey]: varValue
            }
        }).then(async (app) => {
            await message.sendReply(Lang.SET_SUCCESS.format(varKey, varValue));
        });
    } else {
        await message.sendReply(Lang.INVALID);
    }
}));

Bot.addCommand({pattern: 'removevar ?(.*)', fromMe: true, desc: Lang.DELVAR_DESC}, (async (message, match) => {

    if (match[1] === '') return await message.sendReply(Lang.KEY_VAL_MISSING);
    await heroku.get(baseURI + '/config-vars').then(async (vars) => {
        key = match[1].trim();
        for (vr in vars) {
            if (key == vr) {
                await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        [key]: null
                    }
                });
                return await message.sendReply(Lang.DEL_SUCCESS.format(key));
            }
        }
        await message.sendReply(Lang.NOT_FOUND);
    }).catch(async (error) => {
        await message.sendReply(error.message);
    });

}));

Bot.addCommand({pattern: 'getvar ?(.*)', fromMe: true, desc: Lang.GETVAR_DESC}, (async (message, match) => {

    if (match[1] === '') return await message.sendReply(Lang.KEY_VAL_MISSING);
    await heroku.get(baseURI + '/config-vars').then(async (vars) => {
        for (vr in vars) {
            if (match[1].trim() == vr) return await message.sendReply("```{} - {}```".format(vr, vars[vr]));
        }
        await message.sendReply(Lang.NOT_FOUND);
    }).catch(async (error) => {
        await message.sendReply(error.message);
    });
}));

if (Config.WORKTYPE == 'private') {

    Bot.addCommand({pattern: 'dyno', fromMe: true, desc: Lang.DYNO_DESC}, (async (message, match) => {

        heroku.get('/account').then(async (account) => {
            // have encountered some issues while calling this API via heroku-client
            // so let's do it manually
            url = "https://api.heroku.com/accounts/" + account.id + "/actions/get-quota"
            headers = {
                "User-Agent": "Chrome/80.0.3987.149 Mobile Safari/537.36",
                "Authorization": "Bearer " + Config.HEROKU.API_KEY,
                "Accept": "application/vnd.heroku+json; version=3.account-quotas",
            }
            await got(url, {headers: headers}).then(async (res) => {
               const resp = JSON.parse(res.body);
               total_quota = Math.floor(resp.account_quota);
               quota_used = Math.floor(resp.quota_used);         
               percentage = Math.round((quota_used / total_quota) * 100);
               remaining = total_quota - quota_used;
               await message.client.sendMessage(
                    message.jid,
                    Lang.DYNO_TOTAL + ": ```{}```\n\n".format(secondsToHms(total_quota))  + 
                    Lang.DYNO_USED + ": ```{}```\n".format(secondsToHms(quota_used)) +  
                    Lang.PERCENTAGE + ": ```{}```\n\n".format(percentage) +
                    Lang.DYNO_LEFT + ": ```{}```\n".format(secondsToHms(remaining)),
                    MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data
               })
            }).catch(async (err) => {
                await message.client.sendMessage(message.jid,err.message, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data})
            });        
        });
    }));
}
else if (Config.WORKTYPE == 'public') {

    Bot.addCommand({pattern: 'dyno', fromMe: false, desc: Lang.DYNO_DESC}, (async (message, match) => {

        heroku.get('/account').then(async (account) => {
            // have encountered some issues while calling this API via heroku-client
            // so let's do it manually
            url = "https://api.heroku.com/accounts/" + account.id + "/actions/get-quota"
            headers = {
                "User-Agent": "Chrome/80.0.3987.149 Mobile Safari/537.36",
                "Authorization": "Bearer " + Config.HEROKU.API_KEY,
                "Accept": "application/vnd.heroku+json; version=3.account-quotas",
            }
            await got(url, {headers: headers}).then(async (res) => {
               const resp = JSON.parse(res.body);
               total_quota = Math.floor(resp.account_quota);
               quota_used = Math.floor(resp.quota_used);         
               percentage = Math.round((quota_used / total_quota) * 100);
               remaining = total_quota - quota_used;
               await message.client.sendMessage(
                    message.jid,
                    Lang.DYNO_TOTAL + ": ```{}```\n\n".format(secondsToHms(total_quota))  + 
                    Lang.DYNO_USED + ": ```{}```\n".format(secondsToHms(quota_used)) +  
                    Lang.PERCENTAGE + ": ```{}```\n\n".format(percentage) +
                    Lang.DYNO_LEFT + ": ```{}```\n".format(secondsToHms(remaining)),
                    MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data
               })
            }).catch(async (err) => {
                await message.client.sendMessage(message.jid,err.message, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data})
            });        
        });
    }));
}
