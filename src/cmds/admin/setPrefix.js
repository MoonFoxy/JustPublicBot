module.exports.run = (app, message, [ prefix ]) => {
    if((!prefix) || prefix.length > 3){
        message.embeder.warn('Укажите префикс не длинее 3 символов');
        return;
    }
    message.guild.db.setPrefix(prefix);
    message.embeder.send('[SetPrefix]',`Префикс успешно установлен на "${prefix}"`)
};
module.exports.config = {
    name: "setprefix",
	aliases: [],
    usage: '!setprefix [prefix]',
    description: 'Устанавливает префикс на сервере'
};