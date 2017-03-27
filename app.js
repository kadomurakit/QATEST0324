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

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/api', function(req, res) {
  var options = {
    method: 'POST',
    uri: 'https://api.line.me/v2/bot/message/reply',
    body: {
      replyToken: req.body.events[0].replyToken,
      messages: [{
        type: "text",
        text: req.body.events[0].message.text
      }]
    },
    auth: {
      bearer: 'SqHs6RnPOfkmIhGAz7O7vbUKemOqzcJ1XQAcea7aWmMiJIZC6aOswHTepCmRlnMUFVoR/Xo3ebfLOwpIWlQpxqZbquf5HZms+pEjLnhJ/IXZNkrwdxKdg0WajmWu2X4CS4+48Z2wTMAM7I0Md9ViZAdB04t89/1O/w1cDnyilFU='
    },
    json: true
  };
  request(options, function(err, res, body) {
    console.log(JSON.stringify(res));
  });
  res.send('OK');
});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});


