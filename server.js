var express = require('express');
var app = express();

const bitgoApi = 'https://app.bitgo-test.com';
const endpoints = {
    clientConstants: '/api/v1/client/constants',
    tbtcKey: '/api/v2/tbtc/key',
}
const secretAccessToken = 'v2xba53850e80fa7af49aa1bdd63ca96f349274ce6b8feb60ca2037548c78234d3a';

app.use(express.json());
app.all('*', function(req, res, next) {
    console.log(`received: ${req.method} ${req.url} ${JSON.stringify(req.body)}`);
    // console.log(`headers: ${JSON.stringify(req.headers)}`);
    req.headers.authorization = `Bearer ${secretAccessToken}`
    // console.log('Replaced auth bearer token');
    // console.log(`new headers: ${JSON.stringify(req.headers)}`)
    next();
});

app.get(endpoints.clientConstants, function (req, res) {
    res.redirect(bitgoApi + endpoints.clientConstants)
});

app.post(endpoints.tbtcKey, function(req, res) {
    // res.end()
    res.redirect(bitgoApi + endpoints.tbtcKey);
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Proxy POC listening at http://%s:%s", host, port);
});

