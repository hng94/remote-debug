import httpProxy from "http-proxy";
import http from "http";
import fs from "node:fs";

const proxy = httpProxy.createProxyServer({
  target: {
    protocol: 'https:', //protocol must be https, wss will make socket hang up
    host: '127.0.0.1',
    port: '8443',
  },
  ws: true, //this option enables websocket connection
  secure: false,
  proxyTimeout: 5000
});

const proxyServer = http.createServer(function (req, res) {
  proxy.web(req, res);
});

proxyServer.on('upgrade', function (req, socket, head) {
  console.log('upgrade to ws')
  proxy.ws(req, socket, head);
});

proxyServer.listen(6001, () => {
    console.log("ReversedProxy is running at http://localhost:6001")
});