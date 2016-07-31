// FluxCartActions.js

var AppDispatcher = require('../dispatcher/AppDispatcher');
var FluxCartConstants = require('../constants/FluxCartConstants');

var FluxCartActions = {
	// Receive initial product data
	receiveProduct: function(data) {
		AppDispatcher.handleAction({
			actionType: FluxCartConstants.RECEIVE_DATA,
			data: data
		});
	},

	// Set currently set product version
	selectProduct: function(index) {
		AppDispatcher.handleAction({
			actionType: FluxCartConstants.SET_SELECTED,
			index: index
		});
	},

	// Add item to cart
	addToCart: function(sku, update) {
		AppDispatcher.handleAction({
			actionType: FluxCartConstants.CART_ADD,
			sku: sku,
			update: update
		});
	},

	// Remove item from cart
	removeFromCart: function(sku) {
		AppDispatcher.handleAction({
			actionType: FluxCartConstants.CART_REMOVE,
			sku: sku
		});
	},

	// Update cart visibility status
	updateCartVisible: function(cartVisible) {
		AppDispatcher.handleAction({
			actionType: FluxCartConstants.CART_VISIBLE,
			cartVisible: cartVisible
		});
	}
};

module.exports = FluxCartActions;