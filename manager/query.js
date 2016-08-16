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

module.exports = {
    getPolls: getPolls
}