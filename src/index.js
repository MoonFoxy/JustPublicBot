require('./prototype.js')
const discord = require('discord.js');
const App = require('./structures/App.js');
const fs = require('fs')
const { token } = require('./config.json');

const app = new App({
	cmdFolders: './src/cmds/',
	eventFolders: './src/events/',
	clientOptions: { token }
})

module.exports = app

app.handler('cmds', (props, file, folder) => {
	let { config, run } = props
	if(!config || !run)return;
	let { name, aliases } = config;
	if(!name)return;
	console.log('[cmds]', `[${folder}]`, name)
	if(!app.commands.categories.includes(folder)) app.commands.categories.push(folder);
	config.category = folder;
	app.commands.set(name, props);
	if(aliases && aliases.length) for(const alias of aliases) app.aliases.set(alias, app.commands.get(name))
})

app.handler('events', (props, file, folder) => {
	let { run } = props
	if(!run)return;
	let [ fileName ] = file.split('.')
	console.log('[events]', `[${folder}]`, fileName)
	app.client.on(folder, run)
})

app.cmdRun(({ message, args, cmd }) => {
	cmd.run(app, message, args)
})
