// Requires
const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

// Port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// URL struct
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/page2': htmlHandler.getPage2,
  '/page3': htmlHandler.getPage3,
  '/party.mp4': mediaHandler.getParty,
  '/bling.mp3': mediaHandler.getBling,
  '/bird.mp4': mediaHandler.getBird,
  index: htmlHandler.getIndex,
};

// On Request
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  const responseFunc = urlStruct[parsedUrl.pathname];
  if (responseFunc) {
    responseFunc(request, response);
  } else {
    urlStruct.index(request, response);
  }
};

// Create Server
http.createServer(onRequest).listen(port, () => {
  // console.log(`Listening on 127.0.0.1:${port}`);
});
