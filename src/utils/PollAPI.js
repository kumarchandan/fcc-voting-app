// PollAPI.js

var PollActions = require('../actions/PollActions')
var request = require('superagent')

// Utility to load data first time
module.exports = {
    //
    getPolls: function() {
        request.get('api/polls').end(function(err, res) {
            if(err) throw err
            console.log('getPolls ', res.body.data)
            //
            PollActions.getPolls(res.body.data)
        })
    },
    //
    createPoll: function(poll) {
        request.post('api/create').send(poll).set('Accept', 'application/json').end(function(err, res) {
            if(err) throw err
            //
            PollActions.createPoll(res.body.data)
        })
    },
    // User specific polls
    getMyPolls: function() {
        request.get('api/mypolls').end(function(err, res) {
            if(err) throw err
            //
            console.log('my polls ', res.body.data)
            PollActions.getMyPolls(res.body.data)
        })
    }
}