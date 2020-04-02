module.exports.run = (app, message, args) => {
    let member = message.mentions.members.first();
    if(!member) {
    	message.embeder.warn('Укажите пользователя\nban [member]');
    	return;
    }
    if(!member.kickable){
    	message.embeder.warn('Прости, я не могу кикнуть этого человека. Он в списке ролей стоит выше меня. Может ты можешь это исправить?')
    	return;
    }
    member.kick();
    message.embeder.send('[KICK]', `${member.user.username}, успешно кикнут`)
};
module.exports.config = {
    name: "kick",
	aliases: [],
    usage: '!kick [member]',
    description: 'выгоняет пользователя с сервера'
};