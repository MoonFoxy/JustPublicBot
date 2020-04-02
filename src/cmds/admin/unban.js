module.exports.run = async (app, message, args) => {
	let id = message.mentions.users.first() ? message.mentions.users.first().id : args[0]
	if(!id){
		message.embeder.warn('Укажите id пользователя с которого вы хотите снять блокировку');
		return;
	}
	if(!message.guild.me.permissions.has('BAN_MEMBERS')){
		message.embeder.warn('Простите, у меня нет прав снимать блокировки на этом сервере.')
		return;
	}
	message.guild.fetchBan(id).then(({ user }) => {
		message.guild.unban(id).catch(console.error);
		message.embeder.send('[UnBan]',`${user.username} успешно разблокирован на данном сервере`)
	}).catch(err => {
		if(err.message == 'Unknown Ban'){
			message.embeder.warn('Данный пользователь не находится в блокировке.')
			return;
		}
		console.error(err)
		message.embeder.warn('Произошла ошибка. \nМы уже отправили о ней информацию тех. администратору.')
	})

};
module.exports.config = {
    name: "unban",
	aliases: [],
	usage: '!ban [member id]',
};