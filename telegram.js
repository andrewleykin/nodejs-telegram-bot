const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs')
const TOKEN = '474273577:AAF3hG8svX6CP_7WWbxI8zcx33cQ2WKvxaw';

const bot = new TelegramBot(TOKEN, {polling: true});

const KB = {
	schedule: 'Расписание',
	info: 'Информация',
	date: 'Даты',
	place: 'Место проведения',
	day1: '1 День',
	day2: '2 День',
	day3: '3 День',
	day4: '4 День',
	back: 'Назад'
}

const inline = {
	date: '/date',
	schedule: '/schedule',
	place: '/place'
}

bot.onText(/\/start/, msg => {
	sendGreeting(msg, false)
})

bot.on('message', msg => {
	const chatId = msg.chat.id
	switch(msg.text){
		case KB.schedule:
		case inline.schedule:
			sendScheduleChoise(chatId)
			break
		case KB.info:
			sendInfo(chatId)
			break
		case KB.back:
			sendGreeting(msg)
			break
		case KB.date:
		case inline.date:
			sendDate(chatId)
			break
		case KB.place:
		case inline.place:
			sendPlace(chatId)
			break
	}
});

bot.on('callback_query', query => {
	sendSchedule(query)
})

function sendGreeting(msg, notHello = true) {

	const chatId = msg.chat.id;
	const text = notHello ? 'Что вы хотите сделать?' : `Приветствую, ${msg.from.first_name}\nЧто вы хотите сделать?`

	bot.sendMessage(chatId, text, {
		reply_markup: {
			keyboard: [
				[KB.schedule, KB.info]
			],
			resize_keyboard: true
		}
	})
};

function sendInfo(chatId) {
	const text = 'Какую информацию вы хотите?'
	bot.sendMessage(chatId, text, {
		reply_markup: {
			keyboard: [
				[KB.date, KB.place],
				[KB.back]
			],
			resize_keyboard: true
		}
	})
};

function sendDate(chatId) {
	const text = 'Даты конференции 2 - 5 ноября!'
	bot.sendMessage(chatId, text, {
		reply_markup: {
			keyboard: [
				[KB.back]
			],
			resize_keyboard: true
		}
	})
};

function sendPlace(chatId) {
	const text = `г. Набережные Челны Церковь "Возрождение"\nул. 40лет Победы дом 47`;
	bot.sendMessage(chatId, text, {
		reply_markup: {
			keyboard: [
				[KB.back]
			],
			resize_keyboard: true
		}
	})
};

function sendScheduleChoise(chatId) {
	const text = 'Выбери день:';
	bot.sendMessage(chatId, text, {
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: KB.day1,
						callback_data: 'day1'
					}
				],
				[
					{
						text: KB.day2,
						callback_data: 'day2'
					}
				],
				[
					{
						text: KB.day3,
						callback_data: 'day3'
					}
				],
				[
					{
						text: KB.day4,
						callback_data: 'day4'
					}
				]
			]
		}
	})
};

function sendSchedule(query) {
	const day = query.data;
	const chatId = query.message.chat.id;

	bot.sendMessage(chatId, 'Загружаю..')
	fs.readFile(`${__dirname}/img/schedule/${day}.jpg`, (error, picture) => {
		if(error) throw error;
		bot.sendPhoto(chatId, picture).then(()=> {
			bot.sendMessage(chatId, 'Отправлено!')
		})
	});
};