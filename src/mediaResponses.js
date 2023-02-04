// Requires
const fs = require('fs');
const path = require('path');

// Load File Function
const loadFile = (request, response, pathname, contentType) => {
  const file = path.resolve(__dirname, pathname);

  // Loads the File Object
  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end(err);
    }

    // Checks for range headers
    let { range } = request.headers;
    if (!range) {
      range = 'bytes=0-';
    }

    // Gets the byte range based on the range header
    const positions = range.replace('bytes=', '').split('-');

    let start = parseInt(positions[0], 10);

    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    // Determines Chunk Size
    const chunksize = (end - start) + 1;

    // Writes the body of the response
    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
    });

    // Creates a file stream
    const stream = fs.createReadStream(file, { start, end });

    stream.on('open', () => {
      stream.pipe(response);
    });

    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });

    return stream;
  });
};

// Get Party MP4
const getParty = (request, response) => {
  loadFile(request, response, '../client/party.mp4', 'video/mp4');
};

// Get Party MP4
const getBling = (request, response) => {
  loadFile(request, response, '../client/bling.mp3', 'audio/mpeg');
};

// Get Party MP4
const getBird = (request, response) => {
  loadFile(request, response, '../client/bird.mp4', 'video/mp4');
};

// Exports
module.exports = {
  getParty,
  getBling,
  getBird,
};
