// manager/update.js

var Poll = require('../models/poll')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

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

// Vote
function vote(req, res, next) {
    //
    var _id = req.body._id
    var _optionSel = req.body.optionSel
    //
    //
    if(req.user && req.user._id) {
        var voterUserid = req.user._id
        Poll.find({ _id: _id, voterUserid: voterUserid })
            .then(function(poll) {
                if(poll && poll.length !== 0) {
                    res.status(200).json({
                        data: {
                            msg: "You already Voted Pal! :)"
                        }
                    })
                } else {
                    // Update Vote with Userid
                    var query = { _id: _id, "options.text": _optionSel }
                    Poll.update( query, { $inc: {"options.$.vote": 1 }, $push: { voterUserid: voterUserid } })
                        .then(function(doc) {
                            if(doc) {
                                Poll.find({ _id: _id })
                                    .then(function(poll) {
                                        if(poll) {
                                            res.status(200).json({
                                                data: {
                                                    poll: poll,
                                                    msg: 'You Voted successfully!'
                                                }
                                               
                                            })
                                        }
                                        return null     // to suppress warning: http://bluebirdjs.com/docs/warning-explanations.html
                                    })
                            }
                            return null
                        })
                }
            })
            .catch(function(err) {
                throw err
            })
    } else { // No Userid[Guest User], So Vote with IP
        var voterIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
        Poll.find({ _id: _id, voterIP: voterIP })
            .then(function(poll) {
                if(poll && poll.length !== 0) {
                    // IP already Voted
                    res.status(200).json({
                        data: {
                            msg: "You already Voted Pal! :)"
                        }
                    })
                } else {
                    // Update Vote with IP
                    var query = { _id: _id, "options.text": _optionSel }
                    Poll.update(query, { $inc: {"options.$.vote": 1 }, $push: { voterIP: voterIP } })
                        .then(function(doc) {
                            if(doc) {
                                Poll.find({ _id: _id })
                                    .then(function(poll) {
                                        if(poll) {
                                            res.status(200).json({
                                                data: {
                                                    poll: poll,
                                                    msg: 'You Voted successfully!'
                                                }
                                            })
                                        }
                                        return null
                                    })
                            }
                            return null
                        })
                }
            })
            .catch(function(err) {
                throw err
            })
    }
}

module.exports = {
    createPoll: createPoll,
    vote: vote
}