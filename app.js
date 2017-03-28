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

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/api', function(req, res) {
  var text = req.body.events[0].message.text;
  var options = null;
  if (rule.is_recommend_rule(text)) {
  	options = {
      method: 'POST',
      uri: 'https://api.line.me/v2/bot/message/reply',
      body: {
        replyToken: req.body.events[0].replyToken,
        messages: [{
          type: "template",
          altText: "おすすめの映画",
          template: {
            type: "carousel",
            "columns": [
              {
                thumbnailImageUrl: "https://imgc.nxtv.jp/img/info/tit/00004/SID0004254.png",
                title: "闇金ウシジマくん Part２",
                text: "もはや怪優の域!?山田孝之が冷酷非情な闇金屋を演じる人気シリーズの劇場版第2弾",
                actions: [
                  {
                    type: "uri",
                    label: "アプリを起動",
                    uri: "http://www.yahoo.co.jp/"
                  }
                ]
              }
            ]
          }
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
  }
  else {
    options = {
      method: 'POST',
      uri: 'https://api.line.me/v2/bot/message/reply',
      body: {
        replyToken: req.body.events[0].replyToken,
        messages: [{
          type: "text",
          text: text
        },
        {
        	type: "image",
        	originalContentUrl: "https://imgc.nxtv.jp/img/info/tit/00004/SID0004254.png",
        	previewImageUrl: "https://imgc.nxtv.jp/img/info/tit/00004/SID0004254.png"
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
  }
});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});


