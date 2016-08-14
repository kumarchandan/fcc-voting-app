// PollAPI.js

var PollActions = require('../actions/PollActions')
var request = require('superagent')

// Utility to load data first time
module.exports = {
    // get data from db and call the action to initialize store
    getPolls: function() {
        request.get('api/polls').end(function(err, res) {
            if(err) throw err
            console.log(res.body.data)
            PollActions.getPolls(res.body.data)
        })
    }
}