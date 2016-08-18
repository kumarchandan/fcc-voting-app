// PollStore.js

var AppDispatcher = require('../dispatcher/AppDispatcher')
var PollConstants = require('../constants/PollConstants')
var EventEmitter = require('events').EventEmitter
var _ = require('underscore')


// Initial data
var _polls = []

// Fill _polls when data comes/changes
function loadPolls(data) {
    _polls = data
}

// PollStore Instance
// Extend with EventEmitter.prototype to add event capabilities
var PollStore = _.extend({}, EventEmitter.prototype, {
    getPolls: function() {
        return _polls
    },
    emitChange: function() {
        this.emit('pollChanged')
    },
    addChangeListener: function(callback) {
        this.on('pollChanged', callback)
    },
    removeChangeListener: function(callback) {
        this.removeListener('pollChanged', callback)
    }
})

// register callback with dispatcher
AppDispatcher.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {
        case PollConstants.GET_POLLS:
            loadPolls(action.data)
            PollStore.emitChange()      // emit change as data changed
            break;
        default:
            return true
    }
    return true
})

module.exports = PollStore