var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Voting App' });
});


// route middleware to make sure user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in session carry on
  if(req.isAuthenticated()) {
    return next()
  }
  // if not redirect to error page
  res.render('error', { message: '404 Error'})
}

module.exports = router;
