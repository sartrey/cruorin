const http = require('http');

const state = {
  helloCount: 0,
  cacheCount: 0,
  errorCount: 0
};

const server = http.createServer((request, response) => {
  const { url } = request;
  if (url === '/hello') {
    response.writeHead(200);
    response.end('/hello ' + state.helloCount);
    state.helloCount += 1;
    console.log('[mock]', 'hello');
    return;
  }
  if (url === '/cache') {
    response.writeHead(200);
    response.end('/cache ' + state.cacheCount);
    state.cacheCount += 1;
    console.log('[mock]', 'cache');
    return;
  }
  if (url === '/error') {
    response.writeHead(400);
    response.end('/error ' + state.errorCount);
    state.errorCount += 1;
    console.log('[mock]', 'error');
    return;
  }
  if (url === '/timer') {
    setTimeout(() => {
      console.log('[mock]', 'timer');
      response.end('/timer');
    }, 1000);
  }
});

module.exports = server;
