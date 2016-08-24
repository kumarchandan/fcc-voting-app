// PollServerActions.js

//
var AppDispatcher = require('../dispatcher/AppDispatcher')
var PollConstants = require('../constants/PollConstants')

var PollServerActions = {
    // Create Poll
    createPoll: function(newPoll) {
        AppDispatcher.handleServerAction({
            actionType: PollConstants.CREATE_POLL_RESPONSE,
            data: newPoll
        })
    },
    // Vote
    vote: function(message) {
        //
        AppDispatcher.handleServerAction({
            actionType: PollConstants.VOTE_RESPONSE,
            data: message
        })
    },
    // Custom Vote
    customVote: function(message) {
        //
        AppDispatcher.handleServerAction({
            actionType: PollConstants.CUSTOM_VOTE_RESPONSE,
            data: message
        })
    },
    // Remove
    removePoll: function(pollID) {
        //
        AppDispatcher.handleServerAction({
            actionType: PollConstants.REMOVE_RESPONSE,
            data: pollID
        })
    }
}

//
module.exports = PollServerActions