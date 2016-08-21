// manager/query.js

var Poll = require('../models/poll')

// Get All Polls
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

// Get User Specific Polls
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

module.exports = {
    getPolls: getPolls,
    getMyPolls: getMyPolls
}