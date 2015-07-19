var express = require('express');
var router = express.Router();
var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

var sendSMS = function(message, callback) {
  client.messages.create({
    body: message,
    to: process.env.STEVE || "+17193046504",
    from: process.env.SOURCE,
  }, function(err, sms) {
    if(err) {
      console.log(err);
    }
    if (callback) callback;
  });
  }


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  client.messages.list({
}, function(err, data) {
	res.render('index', {title: "Steveit", message: data.messages})
});
});

router.post('/stevit', function(req, res, next) {
  var message = req.body.search;
  sendSMS(message);

  res.redirect('/');
})

router.get('/success', function(req, res, next){
  res.render("success");
})

module.exports = router;
