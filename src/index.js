// index.js - UI

var React = require('react')
var ReactDOM = require('react-dom')

import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router'

var IndexPage = require('./components/Index.react')
var Polls = require('./components/Polls.react')
var NewPoll = require('./components/NewPoll.react')
var MyPolls = require('./components/MyPolls.react')
var PollDetails = require('./components/PollDetails.react')

// Utilities
var PollAPI = require('./utils/PollAPI')
var AuthAPI = require('./utils/AuthAPI')

// Load data
PollAPI.getPolls()
// Check Session If User is Logged in
AuthAPI.isAuthenticated()

// Home Page
ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path='/' component={IndexPage}>
                <IndexRoute component={Polls} />
                <Route path='/polls' component={Polls}></Route>
                <Route path='/mypolls' component={MyPolls}></Route>
                <Route path='/newpoll' component={NewPoll}></Route>
                <Route path='/polls/:pollID' component={PollDetails}></Route>
            </Route>
        </Router>
    ), document.getElementById('content'))