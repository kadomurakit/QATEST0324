var lineutil = {};
var request = require('request');

lineutil.send_text = function(token, text) {
    var options = {
      method: 'POST',
      uri: 'https://api.line.me/v2/bot/message/reply',
      body: {
        replyToken: token,
        messages: [{
          type: "text",
          text: text
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
module.exports = lineutil;