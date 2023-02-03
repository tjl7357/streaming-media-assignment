// Requires
const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

// Port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// On Request
const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/party.mp4':
      mediaHandler.getParty(request, response);
      break;
    default:
      htmlHandler.getIndex(request, response);
      break;
  }
};

// Create Server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
