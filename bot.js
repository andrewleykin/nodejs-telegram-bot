const vk        = new (require('vk-io')),
    request     = require('request'),
    token = 'da3a10cd5760fc0c21a265798cda4497c73b0cf38f0595b6450fa50340be9f637a1900be0a2693c54c2c0';
    // BOTID   = 3464378;
 
vk.setToken(token);
vk.longpoll.start();

// if(message.text == '/start') { return message.send("вы крутой!11"); }


var commands = [];
 
vk.longpoll.on('message', (message) => {
    // if(message.user == BOTID) return;
    commands.map(function (cmd) {
        if(!cmd.r.test(message.text))return; // посылаем, если регулярка не совпадает с месседжом
        var params = message.text.match(cmd.r) || []; // создаем группы
        params[0] = message; // так надо!1
        cmd.f(message, params); // Передаем в функцию message и params, для дальнейшей работы с ними
    });
});
 
function command(_regex, _desc, _func) {
    commands.push({r: _regex, f: _func, d: _desc}); // Прост красиво оформляем пуш значений в массив.
}
 
command(/^\/help/i, 'none', function (message, params) {
    return message.send("Команды бота:\n" + commands.filter(e => e.d != 'none').map(x => x.d).join("\n"));
});
 
command(/^\/test/i, '/start -- проверка бота', function (message, params) {
    return message.send("Привет, я работаю!");
});