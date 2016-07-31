// app.js
// Bootstrap our application with mock api data

var React = require('react');
var ReactDOM = require('react-dom');
var ProductData = require('./ProductData');
var CartAPI = require('./utils/CartAPI');
var FluxCartApp = require('./components/FluxCartApp.react');

// Load mock data into storage
ProductData.init();

// Load mock api call
CartAPI.getProductData();

// React FluxCartApp Controller View
ReactDOM.render(<FluxCartApp />, document.getElementById('flux-cart'));