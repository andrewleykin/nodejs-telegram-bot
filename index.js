const TOKEN = 'da3a10cd5760fc0c21a265798cda4497c73b0cf38f0595b6450fa50340be9f637a1900be0a2693c54c2c0'
const API = require('node-vk-bot-api');
var VK = require("VK-Promise"),
	vk = new VK(TOKEN);
var jsdom,$;
try {
  jsdom = require("jsdom/lib/old-api.js"); // jsdom >= 10.x
} catch (e) {
  jsdom = require("jsdom"); // jsdom <= 9.x
}

jsdom.env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    $ = require("jquery")(window);
});
// const jsdom = require("jsdom");
// const dom = new jsdom.JSDOM(`<!DOCTYPE html>`);
// var $ = require("jquery")(dom.window);


const bot = new API(TOKEN)
bot.command('test', (ctx) => {
	bot.use(ctx => ctx.name = ajax(ctx.peer_id))
	var msg = ajax(ctx.peer_id);
	console.log(ctx);
	ctx.reply('Привет ' + msg);
});

const ajax = function (id) {
	vk.users.get({
		user_id: id 
	}).then(function (res) {
		var j = res.json();
		return j;
	}).catch(function (error) {
		console.log("Ошибка",error);
	});
	
}

bot.listen();

// bot.command('start', ({ reply }) => reply('This is start!'))
// bot.hears(/(car|tesla)/, ({ reply }) => reply('I love Tesla!'))

// bot.on(({ reply }) => reply('Я не знаю ответа'))