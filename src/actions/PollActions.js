// PollActions.js

var AppDispatcher = require('../dispatcher/AppDispatcher')
var PollConstants = require('../constants/PollConstants')

var PollActions = {
    // Get Polls
    getPolls: function(data) {
        AppDispatcher.handleAction({
            actionType: PollConstants.GET_POLLS,
            data: data
        })
    },
    // Create Poll
    createPoll: function(newPoll) {
        AppDispatcher.handleAction({
            actionType: PollConstants.CREATE_POLL,
            data: newPoll
        })
    }
}

module.exports = PollActions