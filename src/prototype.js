let { Guild, GuildMember } = require('discord.js')
const { RichEmbed, TextChannel, Message, User } = require('discord.js');


const Embeder = require('./structures/Embeder.js');
const GuildDB  = require('./structures/GuildDB.js');
const MemberDB = require('./structures/MemberDB.js');

Object.defineProperty(Guild.prototype, 'db', {
	get(){
		if(!this.hasOwnProperty('_db')) this._db = new GuildDB(this.id);
		return this._db 
	}
})

Object.defineProperty(GuildMember.prototype, 'db', {
	get(){
		if(!this.hasOwnProperty('_db')) this._db = new MemberDB({
			guildid: this.guild.id,
			memberid: this.id
		});
		return this._db 
	}
})

Object.defineProperty(User.prototype, 'embeder', { 
	get(){
		return new Embeder({ 
			channel: this, 
			author: this, 
			guild: null 
		})
	}
})

Object.defineProperty(Message.prototype, 'embeder', { 
	get(){
		return new Embeder({ 
			channel: this.channel, 
			author: this.author || null, 
			guild: this.guild || null 
		})
	}
})
Object.defineProperty(TextChannel.prototype, 'embeder', {
	get(){
		return new Embeder({ 
			channel: this, 
			author: null,
			guild: this.guild || null 
		})
	}
});