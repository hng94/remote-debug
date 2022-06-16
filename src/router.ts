import httpProxy from "http-proxy";
import https from "https";
import fs from "node:fs";
import { WebSocketServer } from 'ws';

const proxy = httpProxy.createProxyServer({
  target: {
    host: '127.0.0.1',
    port: 6969,
  },
  ws: true
});

var ssl_options = {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem')
};

const httpServer = https.createServer(ssl_options, function (req, res) {
  proxy.web(req, res);
});

httpServer.on('upgrade', function (req, socket, head) {
    console.log('upgrade to ws');
    proxy.ws(req, socket, head);
});

httpServer.listen(8443, () => {
    console.log("Router is running at https://localhost:8443")
});
