const http = require('http');
const { URL } = require('url');

const bodyParser = require('./helpers/bodyParser');
const routes = require('./routes');

const config = {
  port: 3000,
}

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(request.url, `http://${request.headers.host}`);
  console.log(`Request method: ${request.method} | EndPoint: ${parsedUrl.pathname}`);

  let { pathname } = parsedUrl;
  let id = null;

  const splitedEndpoint = pathname.split('/').filter(Boolean);

  if (splitedEndpoint.length > 1) {
    pathname = `/${splitedEndpoint[0]}/:id`;
    id = splitedEndpoint[1];
  }

  const route = routes.find(({ endPoint, method }) => pathname === endPoint && request.method === method);

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };
    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(body));
    }

    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      bodyParser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response);
    }
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
});

server.listen(config.port, () => console.log(`🔥 Server started at http://localhost:${config.port}`));