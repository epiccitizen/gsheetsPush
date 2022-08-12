/* Magic Mirror
 * Module: gsheetsPush
 *
 * Magic Mirror By Michael Teeuw https://magicmirror.builders
 * MIT Licensed.
 *
 * Module gsheetsPush by Travis and Jackson
 * MIT Licensed. // yea not really...
 */

Module.register("gsheetsPush", {

	// Default module config
	defaults: {
		sensorPin: 0, // GPIO pin
		title: "Event Uploader",
		//deactivateDelay: 15 * 60 * 1000, // 15 minutes
	},

	// Define required styles
	getStyles: function() {
		return ["font-awesome.css"];
	},

	// Define start sequence
	start: function() {
		Log.info("Starting module: " + this.name);
	
		this.resetCountdown();

		this.loaded = false;
		this.sendSocketNotification("CONFIG", this.config);
	},

	// Override dom generator
	getDom: function() {
		var wrapper = document.createElement("div");

		if(this.config.sensorPin === 0) {
			wrapper.innerHTML = "Please set the <i>GPIO pin number</i> in the config for module: " + this.name + ".";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if(!this.loaded) {
			wrapper.innerHTML = this.translate("LOADING");
			wrapper.className = "dimmed light small";
			return wrapper;
		}
		
	},
		

	// PIR sensor data reception with node_helper
	socketNotificationReceived: function(notification, payload) {
		if(notification === "STARTED") {
			this.loaded = true;
		} else if(notification === "SUCCESS") {
			Log.info(this.name + ": Upload Successful")
		} else if(notification === "DEBUG") {
			Log.error(this.name + ": " + payload);
		}
	},
	

});
