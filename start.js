const http = require('http');
const { Server } = require('./lib');

function startFastServer() {
  const server = http.createServer((request, response) => {
    response.writeHead(200);
    response.write('hello world');
    response.end();
  });
  server.listen('3000');
}

function startSlowServer() {
  const server = http.createServer((request, response) => {
    setTimeout(() => {
      response.writeHead(200);
      response.write('hello world');
      response.end();
    }, 1000);
  });
  server.listen('3001');
}

class CacheServer extends Server {
  reviseRequest(message) {
    message.headers.host = message.headers.host.replace('3002', '3001');
    return message;
  }
}

function startCacheServer() {
  const server = new CacheServer({
    rootdir: '/tmp/cruorin'
  });
  server.listen(3002);
}

class ProxyServer extends Server {
  reviseRequest(message) {
    message.headers.host = message.headers['x-cruorin-host'];
    delete message.headers['x-cruorin-host'];
    return message;
  }
}

function startProxyServer() {
  const server = new ProxyServer({
    rootdir: '/tmp/cruorin'
  });
  server.listen(3002);
}

(function main() {
  // cache / benchmark
  // startFastServer();
  // startSlowServer();
  // startCacheServer();

  // proxy
  startProxyServer();
}());
