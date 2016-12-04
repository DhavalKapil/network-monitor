// Requiring external modules
var pcap = require('pcap');
var moment = require('moment');

// A object reference to make
// a validation in the packets
var TCP = require("./node_modules/pcap/decode/tcp");

// Hack to override HTTPSession events,
// because the default behaviour of the
// http-trace is output all the HTTP traffic
// using console.log
var HTTPSession = require("./node_modules/http_trace/http_session");

// Requiring custom modules
var args = require('./lib/args.js');
var CONST = require('./lib/constants.js');
var ui = require('./lib/ui.js');
var log = require('./lib/log.js');

// Starting a capture session
var start = function() {
	var pcap_session = pcap.createSession(args.params.interface, args.params.filter);

	// Creating a TCP tracker
	var tcp_tracker = new pcap.TCPTracker();

	// Receiving TCP traffic
	tcp_tracker.on('session', function (tcp_session) {
		// Decoding HTTP in TCP session
		var http_session = new HTTPSession(tcp_session);

		// Overriding HTTPSession event
		// to listen http requests and
		// display them in UI
		http_session.on("http request", function (session) {
			var logString = session.request.method + ' ' + session.request.url + ' HTTP/' + session.request.http_version;
			var headers = session.request.headers;
			var timestamp = moment();

			// Display log entry in UI
			ui.displayLog(logString, headers, timestamp);

			// Log the packet transfer to a file if specified
			if(typeof args.params.log !== 'undefined') {
				log.writeLog(http.request, timestamp, args.params.log);
			}
		});
	});

	// Listening on packets
	pcap_session.on('packet', function(raw_packet) {
		// Decoding raw packet
		var packet = pcap.decode.packet(raw_packet);

		// Track TCP packets
		if(packet.payload.payload.payload instanceof TCP) {
			tcp_tracker.track_packet(packet);
		}
	});
};

exports.start = start;