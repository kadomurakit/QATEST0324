var docomoutil = {};
docomoutil.get_reply = function(text) {
    var request = require('sync-request');
    
    var res = request('POST', 'https://api.apigw.smt.docomo.ne.jp/dialogue/v1/dialogue?APIKEY=417146565a696f77706463634d3837786b782e5678662f776a4867796a2f3045372f4679505a4f73323934', {
        json: { message: {utt: text} }
    });

    return JSON.parse(res.getBody('utf8')).utt;
};
module.exports = docomoutil;
