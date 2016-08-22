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
//
function voteMsg(data) {
    _voteMsg = data
}
//
function loadPoll(data) {

    _poll = data
}


// PollStore Instance
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
        if((_poll && _poll.length === 0) || _poll[0]._id !== _id) {
            //PollAPI.getPoll(_id)
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
        case PollConstants.VOTE:
            voteMsg(action.data.msg)        // Vote Message
            if(action.data.poll) {
                loadPoll(action.data.poll)
            }
            PollStore.emitChange()
            break
        case PollConstants.GET_POLL:
            loadPoll(action.data)
            PollStore.emitChange()
            break
        default:
            return true
    }
    return true
})

module.exports = PollStore