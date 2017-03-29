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
};

lineutil.send_carousel = function(token) {
	var options = {
      method: 'POST',
      uri: 'https://api.line.me/v2/bot/message/reply',
      body: {
        replyToken: token,
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
};

module.exports = lineutil;