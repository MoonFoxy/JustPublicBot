module.exports.run = (app, message, [ count ]) => {
	if(!count || count !== +count && count > 100){
		message.embeder.warn('Укажите число сообщений, не больше 100');
		return;
	}
	if(!message.guild.me.permissions.has('MANAGE_MESSAGES')){
		message.embeder.warn('Простите, у меня нет права удалять сообщения на этом сервере.')
		return;
	}
	message.delete();
	message.channel.bulkDelete(+count).then(msgs => {
		message.embeder.send('[Clear]', `Успешно удалено ${msgs.size} сообщений`)
	}).catch(err => {
		if(err.message == 'You can only bulk delete messages that are under 14 days old.'){
			message.embeder.warn('невозможно удалить сообщения которые были отправлены более 2 недель назад')
			return;
		}
		console.error(err)
		message.embeder.warn('Произошла ошибка. \nМы уже отправили о ней информацию тех. администратору.')
	})
}
exports.config = {
	name: 'clear',
	aliases: ['очистить'],
	usage: '!clear [number < 100]',
	description: 'очищает чат'
}