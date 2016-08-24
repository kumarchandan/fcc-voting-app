// PollStore.js

var AppDispatcher = require('../dispatcher/AppDispatcher')
var PollConstants = require('../constants/PollConstants')
var PollAPI = require('../utils/PollAPI')
var EventEmitter = require('events').EventEmitter
var _ = require('underscore')


// Private data
var _polls = []
var _myPolls = []
var _voteMsg = null
var _poll = []
var _owner = null

// All Polls
function loadPolls(data) {
    if(data) {
        _polls = data
    }
}
// My Polls
function loadMyPolls(data) {
    if(data) {
        _myPolls = data
    }
}
// One Poll
function loadPoll(data) {
    if(data) {
        _poll = data
    }
}
// Vote
function voteMsg(data) {
    if(data) {
        _voteMsg = data
    }
}
//
function createPoll(data) {
    if(data) {
        _polls.push(data)
        _myPolls.push(data)
    }
}

// Remove
function removePoll(pollID) {
    if(_polls && Array.isArray(_polls) && _polls.length !== 0) {
        var index
        for(var i = 0; i < _polls.length; i++) {
            if(_polls[i]._id === pollID) {
                index = i
                break
            }
        }
        if(index || index === 0) {
            _polls.splice(index, 1)
        }
    } else {
        _polls = []
    }
    // My Polls removal
    if(_myPolls && Array.isArray(_myPolls) && _myPolls.length !== 0) {
        var index
        for(var i = 0; i < _myPolls.length; i++) {
            if(_myPolls[i]._id === pollID) {
                index = i
                break
            }
        }
        if(index || index === 0) {
            _myPolls.splice(index, 1)
        }
    } else {
        _myPolls = []
    }
}

// Extend with EventEmitter.prototype to add event capabilities
var PollStore = _.extend({}, EventEmitter.prototype, {
    //
    getVoteMsg: function() {
        var temp = _voteMsg
        _voteMsg = null
        return temp
    },
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
    getPoll: function(_id) {
        //
        if((_poll && _poll.length === 0) || _poll[0]._id !== _id) {
            PollAPI.getPoll(_id)
            return true
        } else {
            return _poll
        }
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
            loadPolls(action.data)          // Change All Polls
            PollStore.emitChange()
            break
        case PollConstants.GET_MY_POLLS:
            loadMyPolls(action.data)        // Change My Polls
            PollStore.emitChange()
            break
        case PollConstants.GET_POLL:
            loadPoll(action.data)           // Change One Poll
            PollStore.emitChange()
            break
        case PollConstants.CREATE_POLL_RESPONSE:
            createPoll(action.data)
            PollStore.emitChange()
            break
        case PollConstants.VOTE_RESPONSE:
            voteMsg(action.data.msg)        // Vote
            if(action.data.poll) {
                loadPoll(action.data.poll)
            }
            PollStore.emitChange()
            break
        case PollConstants.CUSTOM_VOTE_RESPONSE:
            voteMsg(action.data.msg)        // Custom Vote
            if(action.data.poll) {
                loadPoll(action.data.poll)
            }
            PollStore.emitChange()
            break
        case PollConstants.REMOVE_RESPONSE:
            removePoll(action.data)         // Remove - Change
            PollStore.emitChange()
        default:
            return true
    }
    return true
})

module.exports = PollStore