module.exports.run = (app, message, args) => {
	message.channel.send('Ping: ' + app.client.ping)
}
exports.config = {
	name: 'ping',
	aliases: ['пинг'],
	usage: '!ping',
	description: 'отображает пинг бота'
}