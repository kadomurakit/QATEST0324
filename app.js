/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

var bodyParser = require('body-parser');

var request = require('request');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

var rule = require('./rule');
var lineutil = require('./lineutil');
var docomoutil = require('./docomoutil');

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/api', function(req, res) {
  var text = req.body.events[0].message.text;
  if (rule.is_recommend_rule(text)) {
    lineutil.send_carousel(req.body.events[0].replyToken);
  }
  else {
  	text = docomoutil.get_reply(req.body.events[0].message.text);
  	lineutil.send_text(req.body.events[0].replyToken, text);
  }
});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});


