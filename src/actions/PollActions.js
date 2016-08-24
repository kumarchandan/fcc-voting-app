// PollActions.js

var AppDispatcher = require('../dispatcher/AppDispatcher')
var PollConstants = require('../constants/PollConstants')
var PollAPI = require('../utils/PollAPI')

// When new data enters the system, whether through a person interacting with the application or through a web api call,
// that data is packaged into an action — an object literal containing the new fields of data and a specific action type.

var PollActions = {             // Library of helper methods - Action Creators
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
    // Get My Polls
    getMyPolls: function(myPolls) {
        AppDispatcher.handleAction({
            actionType: PollConstants.GET_MY_POLLS,
            data: myPolls
        })
    },
    // Create Poll
    createPoll: function(newPoll) {
        AppDispatcher.handleAction({
            actionType: PollConstants.CREATE_POLL
        })
        //
        PollAPI.createPoll(newPoll)
    },
    // Vote
    vote: function(pollID, optionSel) {
        AppDispatcher.handleAction({
            actionType: PollConstants.VOTE
        })
        PollAPI.vote(pollID, optionSel)
    },
    // Remove
    removePoll: function(pollID) {
        AppDispatcher.handleAction({
            actionType: PollConstants.REMOVE,
        })
        //
        PollAPI.removePoll(pollID)
    }
}

module.exports = PollActions