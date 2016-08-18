// utils/AuthAPI.js
var request = require('superagent')
var AuthActions = require('../actions/AuthActions')

module.exports = {
    //
    isAuthenticated: function() {
        request.get('api/auth').end(function(err, res) {
            if(err) throw err
            console.log('isAuthenticated ', res.body.data)
            //
            AuthActions.isAuthenticated(res.body.data)
        })
    }
}