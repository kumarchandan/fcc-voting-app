// FluxProduct.react.js

var React = require('react');
var FluxCartActions = require('../actions/FluxCartActions');

// Flux Product View
var FluxProduct = React.createClass({

    // Add item to cart via actions
    addToCart: function(event) {
        var sku = this.props.selectedVariant.sku;
        var update = {
            name: this.props.product.name,
            type: this.props.selectedVariant.type,
            price: this.props.selectedVariant.price
        };
        FluxCartActions.addToCart(sku, update);
        FluxCartActions.updateCartVisible(true);
    },

    // select variant
    selectVariant: function(event) {
        FluxCartActions.selectProduct(event.target.value);
    },

    // render
    render: function() {
        // calculate ats - available to sell
        var selected = this.props.selectedVariant;
        var ats = (selected.sku in this.props.cartItems) ? selected.inventory - this.props.cartItems[selected.sku].quantity : selected.inventory;
        
        return (
            <div className="flux-product">
                <img src={"images/" + this.props.product.image } />
                <div className="flux-product-detail">
                    <h1 className="name">{this.props.product.name}</h1>
                    <p className="description">{this.props.product.description}</p>
                    <p className="price">Price: $ {this.props.selectedVariant.price}</p>
                    <select onChange={this.selectVariant}>
                        {this.props.product.variants.map(function(variant, index) {
                            return (
                                <option key={index} value={index}>{variant.type}</option>
                            )
                        })}
                    </select>
                    <button type="button" onClick={this.addToCart} disabled={ ats > 0 ? '': 'disabled'} >{ ats > 0 ? 'Add to Cart' : 'Sold Out'}</button>
                </div>
            </div>
        )
    }
});

module.exports = FluxProduct;