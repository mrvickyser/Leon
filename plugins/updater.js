let simpleGit = require('simple-git');
let git = simpleGit();
let fs = require('fs');
let Bot = require('../events');
let {MessageType} = require('@adiwajshing/baileys');
let Config = require('../config');
let exec = require('child_process').exec;
let Heroku = require('heroku-client');
let { PassThrough } = require('stream');
let heroku = new Heroku({ token: Config.HEROKU.API_KEY })
let Language = require('../language');
let Lang = Language.getString('updater');

Bot.addCommand({pattern: 'update$', fromMe: true, desc: Lang.UPDATER_DESC}, (async (message, match) => {
    await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
        await message.sendReply(Lang.UPDATE);
    } else {
        var degisiklikler = Lang.NEW_UPDATE;
        commits['all'].map(
            (commit) => {
                degisiklikler += '▣ [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n';
            }
        );
        
        await message.sendReply(degisiklikler);
    }
}));

Bot.addCommand({pattern: 'update now$', fromMe: true, desc: Lang.UPDATE_NOW_DESC, dontAddCommandList: true}, (async (message, match) => {
    await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
        return await message.sendReply(Lang.UPDATE);
    } else {
        var guncelleme = await message.sendReply(Lang.UPDATING);
        if (Config.HEROKU.HEROKU) {
            try {
                var app = await heroku.get('/apps/' + Config.HEROKU.APP_NAME)
            } catch {
                return await message.sendReply(
                    Lang.INVALID_HEROKU
                   );
            }

            git.fetch('upstream', Config.BRANCH);
            git.reset('hard', ['FETCH_HEAD']);

            var git_url = app.git_url.replace(
                "https://", "https://api:" + Config.HEROKU.API_KEY + "@"
            )
            
            try {
                await git.addRemote('heroku', git_url);
            } catch { console.log('heroku remote ekli'); }
            await git.push('heroku', Config.BRANCH);

            await message.sendReply(Lang.UPDATED);
            await message.sendReply(Lang.AFTER_UPDATE);
            
        } else {
            git.pull((async (err, update) => {
                if(update && update.summary.changes) {
                    await message.sendReply(Lang.UPDATED_LOCAL);
                    exec('npm install').stderr.pipe(process.stderr);
                } else if (err) {
                    await message.sendReply('*❌ An Heroku Error Occurred*\n*ERROR:* ```' + err + '```');
               }
            }));
            await guncelleme.delete();
        }
    }
}));
