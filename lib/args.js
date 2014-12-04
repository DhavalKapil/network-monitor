// Requiring external modules
var argv = require('argv');

// Requiring custom modules
var CONST = require('./constants.js');

// Setting up argv
argv.option(CONST.OPTIONS);
argv.version(CONST.VERSION);
argv.info(CONST.DESCRIPTION);

var arguments = argv.run();

var params = new Object();
params.interface = arguments.options.interface || 'any';
params.filter = arguments.options.filter || 'ip proto \\tcp';
params.log = arguments.options.log;

exports.params = params;