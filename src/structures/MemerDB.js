const app = require('../index.js');
const { dbMembers: db, dbGuilds } = app;
const config = require('../config.json')
const { Guild } = require('discord.js')

class MemberDB{
	constructor({ guildID, memberID } = {}){
		this.id = `${guildID}.${memberID}`;

		let memberDB = db.get(this.id) || {};
		
		this.marks = memberDB.marks || []

		if(!db.has(this.id)) db.set(this.id, this)
	}
	get member(){
		let [ guildID, memberID ] = this.id.split('.')
		let guild = app.client.guilds.get(guildID)
		if(!guild){
			if(dbGuilds.has(guildID)) dbGuilds.remove(guildID);
			return undefined;
		}
		let member = guild.members.get(memberID):
		if(!member){
			if(db.has(this.id)) db.remove(this.id);
			return undefined;
		}
		return member;
	}
	hasMark(mark){
		return this.marks.includes(mark)
	}
	addMark(mark){
		if(this.hasMark(mark)) return;
		this.marks.push(mark)
		db.set(this.id, this);
	}
	removeMark(mark){
		if(!this.hasMark(mark)) return;
		this.marks.splice(this.marks.indexOf(mark), 1)
		db.set(this.id, this);
	}
}

module.exports = MemberDB