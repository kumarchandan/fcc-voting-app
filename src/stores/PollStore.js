// PollStore.js

var AppDispatcher = require('../dispatcher/AppDispatcher')
var PollConstants = require('../constants/PollConstants')
var EventEmitter = require('events').EventEmitter
var _ = require('underscore')


// define initial data
var _polls = []

// Load data for first time
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
        this.emit('change')
    },
    addChangeListener: function(callback) {
        this.on('change', callback)
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback)
    }
})

// register callback with dispatcher
AppDispatcher.register(function(payload) {
    var action = payload.action

    switch (action.actionType) {
        case PollConstants.GET_POLLS:
            loadPolls(action.data)
            PollStore.emitChange()
            break;
    
        default:
            return true
    }
    return true
})

module.exports = PollStore