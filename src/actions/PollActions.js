// PollActions.js

var AppDispatcher = require('../dispatcher/AppDispatcher')
var PollConstants = require('../constants/PollConstants')

var PollActions = {
    getPolls: function(data) {
        AppDispatcher.handleAction({
            actionType: PollConstants.GET_POLLS,
            data: data
        })
    }
}

module.exports = PollActions