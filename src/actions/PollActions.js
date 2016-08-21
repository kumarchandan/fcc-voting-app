// PollActions.js

var AppDispatcher = require('../dispatcher/AppDispatcher')
var PollConstants = require('../constants/PollConstants')

var PollActions = {
    // Get Polls
    getPolls: function(polls) {
        AppDispatcher.handleAction({
            actionType: PollConstants.GET_POLLS,
            data: polls
        })
    },
    // Get Poll
    getPoll: function(poll) {
        AppDispatcher.handleAction({
            actionType: PollConstants.GET_POLL,
            data: poll
        })
    },
    // Create Poll
    createPoll: function(newPoll) {
        AppDispatcher.handleAction({
            actionType: PollConstants.CREATE_POLL,
            data: newPoll
        })
    },
    // Get My Polls
    getMyPolls: function(myPolls) {
        AppDispatcher.handleAction({
            actionType: PollConstants.GET_MY_POLLS,
            data: myPolls
        })
    },
    // Vote
    vote: function(msg) {
        AppDispatcher.handleAction({
            actionType: PollConstants.VOTE,
            data: msg
        })
    }
}

module.exports = PollActions