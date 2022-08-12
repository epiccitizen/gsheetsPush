'use strict';

/* Magic Mirror
 * Module: gsheetsPush
 *
 * Magic Mirror By Michael Teeuw https://magicmirror.builders
 * MIT Licensed.
 *
 * Module gsheetsPush By Travis and Jackson
 * MIT Licensed. // not really...
 */

const NodeHelper = require('node_helper');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

module.exports = NodeHelper.create({

	start: function() {
		this.started = false;
	},

	gsheetsPush: function() {
		//exec('pkill -f "python3 -u ' + __dirname + '/pir.py"', { timeout: 500 });
		const process = spawn('python', ['-u', __dirname + '/gsheetsCall.py']);

		var self = this;
		process.stdout.on('data', function(data) {
			if(data.indexOf("SUCCESS") === 0) {
				self.sendSocketNotification("SUCCESS", true);
			}
		});
	},
	

	

	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === 'CONFIG' && self.started == false) {
			self.config = payload;

			self.sendSocketNotification("STARTED", true);
			self.started = true;
			self.gsheetsPush();
		}
	}
});

