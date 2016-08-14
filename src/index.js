// index.js - UI

var React = require('react')
var ReactDOM = require('react-dom')
var IndexPage = require('./components/Index.react')
var PollAPI = require('./utils/PollAPI')

// call util and fill store with db initial data
PollAPI.getPolls()

// render index page content
ReactDOM.render(<IndexPage />, document.getElementById('content'))