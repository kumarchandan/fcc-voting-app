// PollAPI.js

var PollActions = require('../actions/PollActions')
var request = require('superagent')

// Utility to load data first time
module.exports = {
    //
    getPolls: function() {
        request.get('api/polls').end(function(err, res) {
            if(err) throw err
            console.log('getPolls ', res.body.data)
            //
            PollActions.getPolls(res.body.data)
        })
    }
}