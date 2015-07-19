var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/auth/slack',
  passport.authorize('slack'));

router.get('/logout', function (req, res, next){
  req.session = null;
  res.redirect('/');
})

router.get('/auth/slack/callback',
passport.authenticate('slack', {
  failureRedirect: '/',
  successRedirect: '/'
}));
module.exports = router;
