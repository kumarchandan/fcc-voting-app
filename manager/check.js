// manager/check.js

//
var Poll = require('../models/poll')

// Check User Authentication
function isAuthenticated(req, res, next) {
  // if user is authenticated in session carry on
  if(req.isAuthenticated()) {
    res.status(200).json({
      data: req.user
    })
  } else {
      res.status(200).json({
        data: false
      })
  }
}

module.exports = {
    isAuthenticated: isAuthenticated
}