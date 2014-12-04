// Requiring external modules
var pcap = require('pcap');
var moment = require('moment');

// Requiring custom modules
var args = require('./lib/args.js');
var CONST = require('./lib/constants.js');
var ui = require('./lib/ui.js');
var log = require('./lib/log.js');

// Starting a capture session
var start = function() {
	var pcap_session = pcap.createSession(args.params.interface, args.params.filter);

	// Creating a TCP tracker
	var tcp_tracker = new pcap.TCP_tracker();

	tcp_tracker.on('http request', function(session, http) {
		var logString = http.request.method + ' ' + http.request.url + ' HTTP/' + http.request.http_version;
		var headers = http.request.headers;

		var timestamp = moment();

		// display log entry in ui
		ui.displayLog(logString, headers, timestamp);

		// Log the packet transfer to a file if specified
		if(typeof args.params.log !== 'undefined') {
			log.writeLog(http.request, timestamp, args.params.log);
		}
	});

	// Listening on packets
	pcap_session.on('packet', function(raw_packet) {
		// Decoding raw packet
		var packet = pcap.decode.packet(raw_packet);

		// Track TCP packets
		if(packet.link.ip.protocol_name === 'TCP') {
			tcp_tracker.track_packet(packet);
		}
	});
};

exports.start = start;