// FluxCartConstants.js

var keyMirror = require('fbjs/lib/keyMirror');

// Define the action constants
module.exports = keyMirror({
	CART_ADD: null,				// Add the cart
	CART_REMOVE: null,			// Remove the cart
	CART_VISIBLE: null,			// Show or Hide Cart
	SET_SELECTED: null,			// Selects a Product Option
	RECEIVE_DATA: null			// Load the mockup data
});