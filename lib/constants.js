// Requiring modules
var packageJson = require('../package.json');

// Exporting version
exports.VERSION = packageJson.version;

// Exporting application name
exports.NAME = packageJson.name;

// Exporting description
exports.DESCRIPTION = packageJson.description;

// Exporting command line argument options
exports.OPTIONS = [
	{
		name: 'interface',
		short: 'i',
		type: 'string',
		description: 'Defines the interface on which to listen to',
		example: 'sudo node app.js --interface=eth0 or sudo node app.js -i eth0'
	},
	{
		name: 'filter',
		short: 'f',
		type: 'string',
		description: 'Defines the filter to be applied on the interface',
		example: 'sudo node app.js --filter=tcp or sudo node app.js -f tcp'
	},
	{
		name: 'log',
		short: 'l',
		type: 'string',
		description: 'Defines the file to log the traffic to',
		example: 'sudo node app.js --log=File.txt or sudo node app.js -l File.txt'
	}
];

