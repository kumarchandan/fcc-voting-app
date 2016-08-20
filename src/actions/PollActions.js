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
    vote: function(pollID, optionSel) {
        AppDispatcher.handleAction({
            actionType: PollConstants.VOTE,
            pollID: pollID,
            optionSel: optionSel
        })
    }
}

module.exports = PollActions