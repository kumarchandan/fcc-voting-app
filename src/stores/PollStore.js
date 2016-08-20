// PollStore.js

var AppDispatcher = require('../dispatcher/AppDispatcher')
var PollConstants = require('../constants/PollConstants')
var PollAPI = require('../utils/PollAPI')
var EventEmitter = require('events').EventEmitter
var _ = require('underscore')


// Private data
var _polls = []
var _myPolls = []

// All Polls
function loadPolls(data) {
    _polls = data
}
// User specific polls
function loadMyPolls(data) {
    _myPolls = data
}

// Add New Poll
function addPoll(data) {
    _polls.push(data)
    _myPolls.push(data)
}


// PollStore Instance
// Extend with EventEmitter.prototype to add event capabilities
var PollStore = _.extend({}, EventEmitter.prototype, {
    //
    getPolls: function() {
        return _polls
    },
    //
    getMyPolls: function() {
        if(_myPolls && _myPolls.length === 0) {
            PollAPI.getMyPolls()
        }
        return _myPolls
    },
    //
    getPollDetails: function(_id) {
        if(_polls && _polls.length !== 0) {
            var data = _polls.filter(function(poll) {
                return poll._id === _id
            })
            return data
        }
        return null
    },
    //
    emitChange: function() {
        this.emit('pollChanged')
    },
    //
    addChangeListener: function(callback) {
        this.on('pollChanged', callback)
    },
    //
    removeChangeListener: function(callback) {
        this.removeListener('pollChanged', callback)
    }
})

// register callback with dispatcher
AppDispatcher.register(function(payload) {
    //
    var action = payload.action
    //
    switch (action.actionType) {
        case PollConstants.GET_POLLS:
            loadPolls(action.data)      // loadPolls
            PollStore.emitChange()
            break
        case PollConstants.CREATE_POLL:
            addPoll(action.data)        // addPoll
            PollStore.emitChange()
            break
        case PollConstants.GET_MY_POLLS:
            loadMyPolls(action.data)    // loadMyPolls
            PollStore.emitChange()
            break
        default:
            return true
    }
    return true
})

module.exports = PollStore