// FluxCart.react.js

var React = require('react');
var FluxCartActions = require('../actions/FluxCartActions');

// FluxCart View
var FluxCart = React.createClass({

    // Remove cart
    removeFromCart: function(sku) {
        FluxCartActions.removeFromCart(sku);
        FluxCartActions.updateCartVisible(false);
    },
    // close cart
    closeCart: function() {
        FluxCartActions.updateCartVisible(false);
    },
    // open cart
    openCart: function() {
        FluxCartActions.updateCartVisible(true);
    },
    // render
    render: function() {
        var self = this,
            items = this.props.items;

        return (
            <div className={"flux-cart "+ (this.props.visible ? 'active' : '')}>
                <div className="mini-cart">
                    <button type="button" className="close-cart" onClick={this.closeCart}>&times;</button>
                    <ul>
                        {Object.keys(items).map(function(product) {
                            return (
                                <li key={product}>
                                    <h1 className="name">{items[product].name}</h1>
                                    <p className="type">{items[product].type} x {items[product].quantity}</p>
                                    <p className="price">{(items[product].price) * (items[product].quantity).toFixed(2)}</p>
                                    <button type="button" className="remove-item" onClick={self.removeFromCart.bind(self, product)}>Remove</button>
                                </li>
                            )
                        })}
                    </ul>
                    <span className="total">Total: ${this.props.total}</span>
                </div>
                <button type="button" className="view-cart" onClick={this.openCart} disabled={Object.keys(this.props.items).length > 0 ? '': 'disabled'}>View Cart {this.props.count}</button>
            </div>
        )
    }
});

module.exports = FluxCart;