'use strict';
console.log('Loading event');

var request = require('request');

exports.handler = function(event, context, callback) {
  var endpoints = process.env.ENDPOINTS.split('|');
  console.log(endpoints);
  var len = endpoints.length;
  var i = 0;
  var endpoint = "";

  var headers = {
    'User-Agent':       'Webhooks-redirector',
    'Content-Type':     'application/json'
  }

  for (i=0; i<len; ++i) {
    endpoint = endpoints[i];
    console.log(endpoint);

    var options = {
      url: endpoint,
      method: 'POST',
      headers: headers,
      body: JSON.stringify(event)
    }

    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('sucess endpoint: ' + endpoint);
        if (i == len - 1) {
          callback(null, {"status":'success'});
        }
      } else {
        console.log('error endpoint: ' + endpoint);
        callback(new Error("Error while forwarding!"));
      }
    })
  }
};

