let Bot = require('../events');
let {MessageType} = require('@adiwajshing/baileys');
let Config = require('../config');
let axios = require('axios');
let got = require('got');
let td = Config.WORKTYPE == 'public' ? false : true

var GITHUB_DESC = ''
var NEED_USERNAME = ''
var USERNAME = ''
var NAME = ''
var ID = ''
var BIO = ''
var COMP = ''
var EMAIL = ''
var HIRABLE = ''
var URL = ''
var BLOG_URL = ''
var LOC = ''
var PUBLIC = ''
var PUB_GIST = ''
var FOLLOWERS = ''
var FOLLOWING = ''
var CREATED_DATE = ''
var CREATED_TIME = ''
var YES = ''
var NO = ''
if (Config.LANG == 'EN') {
   GITHUB_DESC = "Fetches user Informations in github from username.",
   NEED_USERNAME = "*Please enter a github username to fetch informations!*",
   USERNAME = "Username",
   NAME = "Name",
   ID = "ID",
   BIO = "Biography",
   COMP = "Company",
   EMAIL = "Email",
   HIRABLE = "Hirable",
   URL = "Profile",
   BLOG_URL = "Blog",
   LOC = "Location",
   PUBLIC = "Repositories",
   PUB_GIST = "Gists",
   FOLLOWERS = "Followers",
   FOLLOWING = "Following",
   CREATED_DATE = "Created Date",
   CREATED_TIME = "Created Time",
   NOT_FOUND = "*❌️ Entered username is not valid!*",
   YES = "Yes",
   NO = "No"
}
if (Config.LANG == 'ML') {
   GITHUB_DESC = "ഉപയോക്തൃനാമത്തിൽ നിന്ന് GitHub-ഇൽ ഉപയോക്തൃ വിവരങ്ങൾ ലഭ്യമാക്കുന്നു.",
   NEED_USERNAME = "*വിവരങ്ങൾ ലഭ്യമാക്കാൻ ദയവായി ഒരു github ഉപയോക്തൃനാമം നൽകുക!*",
   USERNAME = "ഉപയോക്തൃനാമം",
   NAME = "പേര്",
   ID = "ഐഡി",
   BIO = "ബയോഗ്രാഫി",
   COMP = "കമ്പനി",
   EMAIL = "ഇമെയിൽ",
   HIRABLE = "ഹിയറബിൾ",
   URL = "പ്രൊഫൈൽ",
   BLOG_URL = "ബ്ലോഗ്",
   LOC = "സ്ഥാനം",
   PUBLIC = "റിപോസിറ്ററികൾ",
   PUB_GIST = "ജിസ്റ്റുകൾ",
   FOLLOWERS = "അനുയായികൾ",
   FOLLOWING = "പിന്തുടരുന്നവർ",
   CREATED_DATE = "സൃഷ്ടിച്ച തീയതി",
   CREATED_TIME = "സൃഷ്ടിച്ച സമയം",
   NOT_FOUND = "*❌️ നൽകിയ ഉപയോക്തൃനാമം സാധുതയുള്ളതല്ല!*",
   YES = "അതെ",
   NO = "അല്ല/ഇല്ല"
}
if (Config.LANG == 'ID') {
   GITHUB_DESC = "Mengambil Informasi pengguna di github dari nama pengguna.",
   NEED_USERNAME = "*Silakan masukkan nama pengguna github untuk mengambil informasi!*",
   USERNAME = "Nama belakang",
   NAME = "Nama",
   ID = "Pengenal",
   BIO = "Biografi",
   COMP = "Perusahaan",
   EMAIL = "Surel",
   HIRABLE = "Bisa Dipekerjakan",
   URL = "Profil",
   BLOG_URL = "Blog",
   LOC = "Lokasi",
   PUBLIC = "Repositories",
   PUB_GIST = "Gists",
   FOLLOWERS = "Pengikut",
   FOLLOWING = "Mengikuti",
   CREATED_DATE = "Tanggal Dibuat",
   CREATED_TIME = "Waktu yang Dibuat",
   NOT_FOUND = "*❌️ Nama pengguna yang dimasukkan tidak valid!*",
   YES = "അതെ",
   NO = "അല്ല/ഇല്ല"
}

Bot.addCommand({pattern: 'github ?(.*)', fromMe: td, desc: GITHUB_DESC}, async (message, match) => {
        if (match[1] === '') return await message.sendReply(NEED_USERNAME);
	const url = `${Config.API}/stalk/github-user?username=${match[1]}`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) {
                    var pp = await axios.get(json.result.avatar_url, { responseType: 'arraybuffer' })
                    await message.client.sendImage(Buffer.from(pp.data), '```💫 ' + USERNAME + '``` *' + json.result.username == 'null' ? YES : NO + '*\n' +
                    '```👤 ' + NAME +'``` *' + json.result.name == 'null' ? YES : NO + '*\n' +
                    '```💬 ' + BIO + '``` *' + json.result.biography == 'null' ? YES : NO + '*\n' +
                    '```🆔 ' + ID + '``` *' + json.result.id == 'null' ? YES : NO + '*\n' +
                    '```👥 ' + COMP + '``` *' + json.result.company == 'null' ? YES : NO + '*\n' +
                    '```🔗 ' + URL + '``` *' + json.result.profile_url == 'null' ? YES : NO + '*\n' +
                    '```🗣️ ' + HIREABLE + '``` *' + json.result.hireable == 'null' ? YES : NO + '*\n' +
                    '```📧 ' + EMAIL + '``` *' + json.result.email == 'null' ? YES : NO + '*\n' +
                    '```🔖 ' + BLOG_URL + '``` *' + json.result.url == 'null' ? YES : NO + '*\n' +
                    '```📍 ' + LOC + '``` *' + json.result.location == 'null' ? YES : NO + '*\n' +
                    '```♦️ ' + PUBLIC + '``` *' + json.result.public_ropo_count == 'null' ? YES : NO + '*\n' +
                    '```📝 ' + PUBLIC_GIST + '``` *' + json.result.public_gist_count == 'null' ? YES : NO + '*\n' +
                    '```⬇️ ' + FOLLOWERS + '``` *' + json.result.followers_count == 'null' ? YES : NO + '*\n' +
                    '```⬆️ ' + FOLLOWING + '``` *' + json.result.following_count == 'null' ? YES : NO + '*\n' +
                    '```📅 ' + CREATED_DATE + '``` *' + json.result.created_date == 'null' ? YES : NO + '*\n' +
                    '```⏰️ ' + CREATED_TIME + '``` *' + json.result.created_time == 'null' ? YES : NO + '*\n');
                }
	} catch {
		return await message.sendReply(NOT_FOUND);
	}
});
