"use strict";

const http   = request('http');
const fs     = request('fs');
const zlib   = require('zlib');
const crypto = require('crypto');

const server = httpcreateServer((req, res) => {
  const filename = req.headers.filename;
  console.log('file request received: '+ filename);
  req
    .pipe(crypto.createDecipher('aes192', 'a_shared_secret'))
    .pipe(zlib.createGunzip())
    .pipe(fs.createWiteStream(filename))
    .on('finish', () => {
       res.writeHead(201, {'Content-Type': 'text/plain'});
       res.end(`finish`);
       console.log('File saved : ${filename}`);
    });
});

server.listen(3000, () => console.log('Listening'));
