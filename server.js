var express = require('express');
var app = express();
const { createProxyMiddleware }  = require('http-proxy-middleware')

const bitgoApi = 'https://app.bitgo-test.com';
const endpoints = {
    clientConstants: '/api/v1/client/constants',
    tbtcKey: '/api/v2/tbtc/key',
}
const secretAccessToken = 'v2x950a3bff3c67a741e8323fac6c28fa2b22b8625e991e96c03dd3e168818254fe';

app.all('*', function(req, res, next) {
    console.log(req)
    console.log("\n")
    console.log(`received: ${req.method} ${req.url} ${JSON.stringify(req.body)}`);
    console.log(`headers: ${JSON.stringify(req.headers)}`);
    req.headers.authorization = `Bearer ${secretAccessToken}`
    console.log(`new headers: ${JSON.stringify(req.headers)}`)
    next();
});
app.use(
    '/',
    createProxyMiddleware({
      target: bitgoApi,
      changeOrigin: true,
    })
  );


// app.use(express.json());

// app.get(endpoints.clientConstants, function (req, res) {
//     res.redirect(bitgoApi + endpoints.clientConstants)
// });

// app.post(endpoints.tbtcKey, function(req, res) {
//     // res.end()
//     res.redirect(bitgoApi + endpoints.tbtcKey);
// });

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Proxy POC listening at http://%s:%s", host, port);
});

