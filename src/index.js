// index.js - UI

var React = require('react')
var ReactDOM = require('react-dom')

import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router'

var Index = require('./components/Index.react')
var MyPolls = require('./components/MyPolls.react')
var NewPoll = require('./components/NewPoll.react')
var Polls = require('./components/Polls.react')
var PollDetails = require('./components/PollDetails.react')

// Utilities
var AuthAPI = require('./utils/AuthAPI')
var PollAPI = require('./utils/PollAPI')


// Init
PollAPI.getPolls()          // Polls
AuthAPI.isAuthenticated()   // User Login status

// onEnter callback
function requireAuth(nextState, replace, done) {
    //
    AuthAPI.isLoggedIn(function(result) {
        if(!result) {
            replace({
                pathname: '/polls',
                state: { nextPathname: nextState.location.pathname }
            })
        }
        done()
    })
}

// Home Page
ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path='/' component={Index}>
                <IndexRoute component={Polls} />
                <Route path='/polls' component={Polls}></Route>
                <Route path='/mypolls' component={MyPolls} onEnter={requireAuth}></Route>
                <Route path='/newpoll' component={NewPoll} onEnter={requireAuth}></Route>
                <Route path='/polls/:pollID' component={PollDetails}></Route>
            </Route>
        </Router>
    ), document.getElementById('content'))