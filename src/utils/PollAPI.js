// PollAPI.js

var PollActions = require('../actions/PollActions')
var request = require('superagent')

// Utility to load data first time
module.exports = {
    // Get All Polls
    getPolls: function() {
        request.get('api/polls').end(function(err, res) {
            if(err) throw err
            console.log('getPolls ', res.body.data)
            //
            PollActions.getPolls(res.body.data)
        })
    },
    // Create New Poll
    createPoll: function(poll) {
        request.post('api/create').send(poll).end(function(err, res) {
            if(err) throw err
            //
            PollActions.createPoll(res.body.data)
        })
    },
    // User Specific Polls
    getMyPolls: function() {
        request.get('api/mypolls').end(function(err, res) {
            if(err) throw err
            //
            console.log('my polls ', res.body.data)
            PollActions.getMyPolls(res.body.data)
        })
    },
    // Vote
    vote: function(_id, optionSel) {
        request.post('api/vote').send({ _id: _id, optionSel: optionSel }).end(function(err, res) {
            if(err) throw err
            //
        })
    }
}