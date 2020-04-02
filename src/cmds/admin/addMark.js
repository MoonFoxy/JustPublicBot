module.exports.run = (app, message, [ , mark ]) => {
   let member = message.mentions.members.first();
   if(!member){
    message.embeder.warn('Укажите пользователя');
    return;
   }
   if(!mark){
    message.embeder.warn('Укажите марку');
    return;
   }
   member.db.addMark(mark);
   message.embeder.send('[AddMark]', `Марка "${mark}" успешно выдана для ${member.user.username}`)
};
module.exports.config = {
    name: "addmark",
  	aliases: [],
    usage: '!addmark [member] [mark]',
    description: 'выгоняет пользователя с сервера'
};