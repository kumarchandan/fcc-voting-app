// manager/query.js

var mongoURL = require('../config/database').mongoURL
var mongoose = require('mongoose')
var Poll = require('../models/poll')
var ObjectID = require('mongodb').ObjectID

// get polls - middleware function
function getPolls(req, res, next) {
    Poll.find(function(err, polls) {
        if(err) throw err
        if(polls.length !== 0) {
            res.status(200).json({
                data: polls
            })
        } else {
            res.status(200).json({
                data: null
            })
        }
        
    })
}

// Get User specific polls
function getMyPolls(req, res, next) {
    //
    if(!req.user.username) {
        res.status(200).json({
            data: null
        })
    }
    //
    var username = req.user._id
    Poll.find({ ownerUserid: username }, function(err, polls) {
        if(polls.length !== 0) {
            res.status(200).json({
                data: polls
            })
        } else {
            res.status(200).json({
                data: null
            })
        }
    })
}

// Create Poll
function createPoll(req, res, next) {
    //
    var newPoll = new Poll()
    if(!req.user._id) {
        res.status(200).json({
            data: 'Not a valid user'
        })
    }
    //
    var options = req.body.options
    var optionsObj = options.map(function(option) {
        return {
            text: option,
            vote: 0
        }
    })

    newPoll.title = req.body.title
    newPoll.options = optionsObj

    newPoll.ownerUserid = req.user._id
    //
    newPoll.save(function(err, poll, numAffected) {
        if(err) throw err
        //
        console.log('Poll Created', poll, numAffected)
        res.status(200).json({
            data: newPoll
        })
    })
}

module.exports = {
    getPolls: getPolls,
    createPoll: createPoll,
    getMyPolls: getMyPolls
}