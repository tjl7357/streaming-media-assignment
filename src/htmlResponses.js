// Requires
const fs = require('fs');

// Get Media
const index = fs.readFileSync(`${__dirname}/../client/client.html`);

// Get Index HTML
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// Exports
module.exports = {
  getIndex,
};
