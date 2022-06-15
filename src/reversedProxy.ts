import httpProxy from "http-proxy";
import http from "http";
import fs from "node:fs";

const proxy = httpProxy.createProxyServer({
  target: {
    protocol: 'https:',
    host: '127.0.0.1',
    port: '8443',
    cert: fs.readFileSync('ssl/cert.pem', 'utf8'),
    // pfx: fs.readFileSync('ssl/client-identity.p12'),
  },
  ws: true,
  secure: false,
  proxyTimeout: 5000
});

const proxyServer = http.createServer(function (req, res) {
  proxy.web(req, res);
});

proxyServer.on('upgrade', function (req, socket, head) {
  console.log('upgrade')
  proxy.ws(req, socket, head);
});

proxyServer.listen(6001, () => {
    console.log("ReversedProxy is running at port 6001")
});

// httpProxy.createProxyServer({
//   target: {
//     protocol: 'https:',
//     host: 'localhost',
//     port: '8443',
//     // pfx: fs.readFileSync('ssl/client-identity.p12')
//   },
  
//   agent  : https.globalAgent,
//   headers: {
//     host: 'localhost',
//   },
// }).listen(6001);