/* @title: <<nodejs-http-layout>> program written in Node.js.
 * @desc: A simple webapp starter with a layout.
 * @author: Mustapha Benmbarek.
 * @Copyright © 2019 All rights reserved.
 * @version: 1.0.0
 */

const http = require('http');
const path = require('path');
const fs = require('fs');


const server = http.createServer((request, response) => {

    let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url);

    let extname = path.extname(filePath);

    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                //Page Not Found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf8');
                });
            }
            else {
                response.writeHead(500);
                response.end(`Server Error: ${err.code}`);
            }
        }
        else {
            //Sucess
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf8');
        }
    });
});

const port = process.env.PORT || 3000;
const hostname = '127.0.0.1';

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});