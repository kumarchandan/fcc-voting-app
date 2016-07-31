// FluxCartApp.react.js

var React = require('react');
var CartStore = require('../stores/CartStore');
var ProductStore = require('../stores/ProductStore');
var FluxProduct = require('./FluxProduct.react');
var FluxCart = require('./FluxCart.react');

// Method to retrieve states from Stores
function getCartState() {
    return {
        product: ProductStore.getProduct(),
        selectedVariant: ProductStore.getSelected(),
        cartItems: CartStore.getCartItems(),
        cartCount: CartStore.getCartCount(),
        cartTotal: CartStore.getCartTotal(),
        cartVisible: CartStore.getCartVisible()
    }
}

// Define Main Controller view
var FluxCartApp = React.createClass({

    // Get initial state from stores
    getInitialState: function () {
        return getCartState();
    },

    // Add change listeners from Stores
    componentDidMount: function () {
        ProductStore.addChangeListener(this._onChange);
        CartStore.addChangeListener(this._onChange);
    },

    // Remove change listeners from stores
    componentWillUnmount: function () {
        ProductStore.removeChangeListener(this._onChange);
        CartStore.removeChangeListener(this._onChange);
    },

    // Render child components, passing state via props
    render: function() {
        debugger;
        return (
            <div className="flux-cart-app">
                <FluxCart items={this.state.cartItems} count={this.state.cartCount} total={this.state.cartTotal} visible={this.state.cartVisible} />
                <FluxProduct product={this.state.product} cartItems={this.state.cartItems} selectedVariant={this.state.selectedVariant} />
            </div>
        )
    },

    // method to setState based upon store changes
    _onChange: function() {
        this.setState(getCartState());
    }
});

module.exports = FluxCartApp;