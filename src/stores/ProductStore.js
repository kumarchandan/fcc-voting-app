// ProductStore.js

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('../constants/FluxCartConstants');
var _ = require('underscore');

// Define initial data points
var _product = {},
	_selected = null;

// Method to load product data from Mock API
function loadProductData(data) {
	_product = data[0];
	_selected = data[0].variants[0];
}

// method to set currently selected product variation
function setSelected(index) {
	_selected = _product.variants[index];
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var ProductStore = _.extend({}, EventEmitter.prototype, {

	// Return Product Data
	getProduct: function() {
		return _product;
	},

	// Return selected product
	getSelected: function(){
		return _selected;
	},

	// Emit Change event
	emitChange: function(){
		this.emit('change');
	},

	// Add change listener
	addChangeListener: function(callback) {
		this.on('change', callback);
	},

	// Remove change listener
	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	}
});


// Register callback with dispatcher
AppDispatcher.register(function(payload) {
	var action = payload.action;
	var text;

	switch(action.actionType) {
		// Respond to RECEIVE_DATA action
		case FluxCartConstants.RECEIVE_DATA:
			loadProductData(action.data);
			break;

		// Respond to SET_SELECTED action
		case FluxCartConstants.SET_SELECTED:
			setSelected(action.index);
			break;

		default:
			return true;
	}

	// If action was responded to, emit change event
	ProductStore.emitChange();
	return true;
});

module.exports = ProductStore;