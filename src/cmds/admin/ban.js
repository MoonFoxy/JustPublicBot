module.exports.run = (app, message, args) => {
    let member = message.mentions.members.first();
    if(!member) {
    	message.embeder.warn('Укажите пользователя\nban [member]');
    	return;
    }
    if(!member.bannable){
    	message.embeder.warn('Прости, я не могу забанить этого человека. Он в списке ролей стоит выше меня. Может ты можешь это исправить?')
    	return;
    }
    member.ban();
    message.embeder.send('[BAN]', `${member.user.username}, успешно заблокирован`)
};
module.exports.config = {
    name: "ban",
	aliases: ['бан'],
    usage: '!ban [member]',
    description: 'Банит пользователя'
};