
// Requiring external modules
var moment = require('moment');
var fs = require('fs');

// Function to add double quotes to a string if there is a space in between
function clean(str) {
	if(str.indexOf(' ')!=-1) {
		return '\"' + str + '\"';
	}

	return str;
}

var writeLog = function(httpRequest, logFile) {
	var log = clean(httpRequest.headers.Host) + ' ';
	log += '[' + moment().format('DD/MMM/YYYY:HH:mm:ss ZZ') + '] ';
	log += clean(httpRequest.method + ' ' + httpRequest.url + ' HTTP/' + httpRequest.http_version) + ' ';
	log += clean(httpRequest.headers['User-Agent']);
	log += '\n';

	// Writing to a file
	fs.appendFile(logFile, log, function(err) {
		if(err)
			throw err;
	});
}

exports.writeLog = writeLog;