// AppDispatcher.js

var Dispatcher = require('flux').Dispatcher;

// Create Dispatcher instance
var AppDispatcher = new Dispatcher();

// Convenience method to handle dispatched requests
AppDispatcher.handleAction = function(action) {
	var payload = {
		source: 'VIEW_ACTION',
		action: action
	};

	this.dispatch(payload);
};

module.exports = AppDispatcher;