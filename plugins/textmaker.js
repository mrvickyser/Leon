let Bot = require('../events');
let Config = require('../config');
let {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
let fs = require('fs');
let axios = require('axios');
let Language = require('../language');
let Lang = Language.getString('ttp');
let td = Config.WORKTYPE == 'public' ? false : true
let tdc = '*Made By Leon*'
const _0x4dd97e=_0x5f2b;(function(_0x231d20,_0x495e5b){const _0x3be458=_0x5f2b,_0x4093a5=_0x231d20();while(!![]){try{const _0x2c9b8e=-parseInt(_0x3be458(0x1cc))/0x1+parseInt(_0x3be458(0x1cd))/0x2+-parseInt(_0x3be458(0x1ce))/0x3*(parseInt(_0x3be458(0x1d5))/0x4)+-parseInt(_0x3be458(0x1d2))/0x5*(parseInt(_0x3be458(0x1cb))/0x6)+parseInt(_0x3be458(0x1ca))/0x7*(-parseInt(_0x3be458(0x1cf))/0x8)+-parseInt(_0x3be458(0x1c9))/0x9*(parseInt(_0x3be458(0x1d3))/0xa)+parseInt(_0x3be458(0x1d6))/0xb;if(_0x2c9b8e===_0x495e5b)break;else _0x4093a5['push'](_0x4093a5['shift']());}catch(_0x36af80){_0x4093a5['push'](_0x4093a5['shift']());}}}(_0x3980,0x5d45f));let prefix;function _0x5f2b(_0x94ff48,_0x7fe8de){const _0x398085=_0x3980();return _0x5f2b=function(_0x5f2b84,_0x19f926){_0x5f2b84=_0x5f2b84-0x1c9;let _0x50b6b1=_0x398085[_0x5f2b84];return _0x50b6b1;},_0x5f2b(_0x94ff48,_0x7fe8de);}/\[(\W*)\]/[_0x4dd97e(0x1d0)](Config[_0x4dd97e(0x1d1)])?prefix=Config[_0x4dd97e(0x1d1)][_0x4dd97e(0x1d4)](/\[(\W*)\]/)[0x1][0x0]:prefix='.';function _0x3980(){const _0x18062e=['HANDLERS','535IZOUSd','1059810QxOpEu','match','2614052JUuRKB','16045238ZYbzTX','18hJBqae','39515NEudti','4986UHBKzs','550795CbAHAW','1049082BGfRSP','3jIlrVk','136zZqPpC','test'];_0x3980=function(){return _0x18062e;};return _0x3980();}

    Bot.addCommand({pattern: 'textmaker', fromMe: td, desc: Lang.TEXT_MAKER}, (async (message, match) => {    

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);
    try {
       var webimage = await axios.get(`https://xteam.xyz/textpro/helloweenfire?APIKEY=${Config.XTEAM_API}&text=Leon%20%20%20%20%20%20%20%20%20Made%20By%20Toxic%20Devil`, { responseType: 'arraybuffer' })
    } catch {
       await message.sendReply("*An error occurred while loading menu!*");
    }

    let capt = `💻Usage: *${prefix}glitch*\nℹ️Desc: It Sends a glitch style image of the text provided.\nYou must enter the heading and subheading seperated by */* in order!.\n\n💻Usage: *${prefix}pornhub*\nℹ️Desc: It Sends a blackish orange coloured image of the text provided.\nYou must enter the heading and subheading seperated by */* in order!.\n\n💻Usage: *${prefix}sandwriting*\nℹ️Desc: It Sends a sand image of the text provided.\n\n💻Usage: *${prefix}blackpink*\nℹ️Desc: It Sends a blackish pink image of the text provided.\n\n💻Usage: *${prefix}luxury*\nℹ️Desc: It Sends 3D Golden Luxury Font style image of the text provided.\n\n💻Usage: *${prefix}metalgold*\nℹ️Desc: It Sends an image of the gold metal font of text provided.\n\n💻Usage: *${prefix}blood*\nℹ️Desc: It Sends a blood image of the text provided.\n\n💻Usage: *${prefix}led*\nℹ️Desc: It Sends an image with led font of the text provided.\n\n💻Usage: *${prefix}glue*\nℹ️Desc: It Sends an image of the provided text in glue font.\n\n💻Usage: *${prefix}snow*\nℹ️Desc: It Sends a snow image of the text provided.\n\n💻Usage: *${prefix}cloud*\nℹ️Desc: It Sends a sky image of the text provided\n\n💻Usage: *${prefix}metalblue*\nℹ️Desc: It Sends a bule metelled fonted image of the text provided\n\n💻Usage: *${prefix}metalpink*\nℹ️Desc: It Sends a pink metalled fonted image of the text provided\n\n💻Usage: *${prefix}holographic*\nℹ️Desc: It Sends a 3D Holograhic font image of the text provided\n\n💻Usage: *${prefix}minion*\nℹ️Desc: It Sends a minion font image of the text provided\n\n💻Usage: *${prefix}joker*\nℹ️Desc: It Sends a joker logo of the text provided.\n\n💻Usage: *${prefix}flame*\nℹ️Desc: It Converts text to to flaming effect.\n\n💻Usage: *${prefix}pokemon*\nℹ️Desc: Converts the text into a pokemon image.\nYou must enter the heading and subheading seperated by */* in order!\n\n💻Usage: *${prefix}marvel*\nℹ️Desc: Converts the text into marvel logo image.\n\n💻Usage: *${prefix}harrypotter*\nℹ️Desc: Converts the text into a harrypotter themed image.\n\n💻Usage: *${prefix}sparkling*\nℹ️Desc: Converts the text into a sparkling themed image\nYou must enter the heading and subheading seperated by */* in order!\n\n💻Usage: *${prefix}watercolour*\nℹ️Desc: Converts the text into a watercolour themed image.\n\n💻Usage: *${prefix}ninjalogo*\nℹ️Desc: Enters the text as the caption for a ninja themed logo.\n\n💻Usage: *${prefix}neonlight*\nℹ️Desc: Converts the text into a neonlight themed image.\n\n💻Usage: *${prefix}3dtext*\nℹ️Desc: Converts the provided text into a 3D style image.`

    await message.sendImage(Buffer.from(webimage.data), capt);

    }));

    Bot.addCommand({pattern: 'glitch ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);
  
  var topText, bottomText;
    if (match[1].includes('/')) {
        var split = match[1].split('/');
        bottomText = split[1];
        topText = split[0];
}

    var webimage = await axios.get(`https://docs-jojo.herokuapp.com/api/ttlogo?text1=${topText}&text2=${bottomText}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);
    }));

    Bot.addCommand({pattern: 'blackpink ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://docs-jojo.herokuapp.com/api/blackpink?text=${match[1]}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'flame ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://xteam.xyz/photooxy/flaming?text=${match[1]}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));


    Bot.addCommand({pattern: 'joker ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://xteam.xyz/textpro/jokerlogo?text=${match[1]}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'pokemon ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);
  
    var webimage = await axios.get(`https://xteam.xyz/photooxy/pokemon?text=${match[1]}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.client.sendMessage(message.jid,Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.png, caption: tdc})

    }));

    Bot.addCommand({pattern: 'marvel ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);
  
  var topText, bottomText;
    if (match[1].includes('/')) {
        var split = match[1].split('/');
        bottomText = split[1];
        topText = split[0];
}

    var webimage = await axios.get(`https://xteam.xyz/textpro/3davengers?text=${topText}&text2=${bottomText}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    })); 

    Bot.addCommand({pattern: 'metalblue ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://xteam.xyz/textpro/glossybluemetal?text=${match[1]}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'metalpink ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://xteam.xyz/textpro/metalpurpledual?text=${match[1]}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'holographic ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://xteam.xyz/textpro/holographic3d?text=${match[1]}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.client.sendMessage(message.jid,Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.png, caption: tdc})

    }));

    Bot.addCommand({pattern: 'minion ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://xteam.xyz/textpro/minion3d?text=${match[1]}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'halloween ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://xteam.xyz/textpro/helloweenfire?text=${match[1]}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'sparkling ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);
  
  var topText, bottomText;
    if (match[1].includes('/')) {
        var split = match[1].split('/');
        bottomText = split[1];
        topText = split[0];
}

    var webimage = await axios.get(`https://docs-jojo.herokuapp.com/api/sparkling?text1=${topText}&text2=${bottomText}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'watercolour ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://docs-jojo.herokuapp.com/api/watercolor?text=${match[1]}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'ninjalogo ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.NEED_WORD);

    var webimage = await axios.get(`https://docs-jojo.herokuapp.com/api/gaming?text=${match[1]}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'neonlight ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://docs-jojo.herokuapp.com/api/neon_light?text=${match[1]}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'sandwriting ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://api.xteam.xyz/textpro/sandwriting?text=${match[1]}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'cloud ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://api.xteam.xyz/textpro/cloudtext?text=${match[1]}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'pornhub ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);
  
  var topText, bottomText;
    if (match[1].includes('/')) {
        var split = match[1].split('/');
        bottomText = split[1];
        topText = split[0];
}

    var webimage = await axios.get(`https://docs-jojo.herokuapp.com/api/phblogo?text1=${topText}&text2=${bottomText}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'snow ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://api.xteam.xyz/textpro/snowtext?text=${match[1]}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'metalgold ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://xteam.xyz/textpro/metaldarkgold?text=${match[1]}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'glue ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://xteam.xyz/textpro/3dglue?text=${match[1]}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'led ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

  var topText, bottomText;
    if (match[1].includes('/')) {
        var split = match[1].split('/');
        bottomText = split[1];
        topText = split[0];
}

    var webimage = await axios.get(`https://xteam.xyz/textpro/realisticvintage?text=${topText}&text2=${bottomText}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'luxury ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://xteam.xyz/textpro/3dluxury?text=${match[1]}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'blood ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://api.xteam.xyz/textpro/bloodontheroastedglass?text=${match[1]}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: 'blackpink ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://api.xteam.xyz/textpro/blackpink?text=${match[1]}&APIKEY=${Config.XTEAM_API}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));

    Bot.addCommand({pattern: '3dtext ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,NEED_WORD);

    var webimage = await axios.get(`https://docs-jojo.herokuapp.com/api/text3d?text=${match[1]}`, { responseType: 'arraybuffer' })

    await message.sendImage(Buffer.from(webimage.data), tdc);

    }));
