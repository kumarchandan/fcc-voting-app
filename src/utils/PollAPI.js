// PollAPI.js

var PollServerActions = require('../actions/PollServerActions')
var request = require('superagent')

// Utility to load data first time
module.exports = {
    // Get All Polls
    getPolls: function() {
        request.get('api/polls').end(function(err, res) {
            if(err) throw err
            //
            PollActions.getPolls(res.body.data)
        })
    },
    // Create Poll
    createPoll: function(poll) {
        request.post('api/create').send(poll).end(function(err, res) {
            if(err) throw err
            //
            PollServerActions.createPoll(res.body.data)
        })
    },
    // User Specific Polls
    getMyPolls: function() {
        request.get('api/mypolls').end(function(err, res) {
            if(err) throw err
            //
            PollActions.getMyPolls(res.body.data)
        })
    },
    //
    getPoll: function(_id) {
        request.get('api/poll?_id='+_id).end(function(err, res) {
            if(err) throw err
            //
            PollActions.getPoll(res.body.data)
        })
    },
    // Vote
    vote: function(_id, optionSel) {
        request.post('api/vote').send({ _id: _id, optionSel: optionSel }).end(function(err, res) {
            if(err) throw err
            //
            PollServerActions.vote(res.body.data)
        })
    },
    // Custom Vote
    customVote: function(_id, optionSel) {
        request.post('api/customvote').send({ _id: _id, optionSel: optionSel }).end(function(err, res) {
            if(err) throw err
            //
            PollServerActions.customVote(res.body.data)
        })
    },
    // Remove Poll
    removePoll: function(_id) {
        var self = this
        self._id = _id
        request.post('api/remove').send({ _id: _id }).end(function(err, res) {
            if(err) throw err
            // Update '/'
            PollServerActions.removePoll(self._id)
        })
    }
}

// Circular dependency - so PollActions lies here ;)
var PollActions = require('../actions/PollActions')