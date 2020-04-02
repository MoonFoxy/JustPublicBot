const app = require('../index.js');
const { dbGuilds: db } = app;
const config = require('../config.json')

class GuildDB{
	constructor(id){
		this.id = id
		let guildDB = db.get(id) || {};
		this.prefix = guildDB.prefix || config.prefix
		this.muteroleid = guildDB.muteroleid || null
		if(!db.has(this.id)) db.set(this.id, this)
	}
	get guild(){
		return app.guilds.get(this.id)
	}
	setPrefix(prefix){
		this.prefix = prefix;
		db.set(this.id, this)
	}
}

module.exports = GuildDB