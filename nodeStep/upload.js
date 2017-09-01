const http = require('http');
const formidable = require('formidable');
const fs = require('fs');

http.createServer((request, response) => {
    if (request.url === '/upload' && request.method.toLowerCase() === 'post') {
        const form = new formidable.IncomingForm();
        form.parse(request, (err, fields, files) => {
            const readSteam = fs.createReadStream(files.upload.path);
            const writeSteam = fs.createWriteStream(`./${files.upload.name}`);
            readSteam.pipe(writeSteam)
        });
        response.end();
        return;
    }

    response.writeHead(200, { 'content-type': 'text/html' });
    response.end(
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="text" name="title"><br>' +
        '<input type="file" name="upload" multiple="multiple"><br>' +
        '<input type="submit" value="Upload">' +
        '</form>'
    );
}).listen(8888, () => {
    console.log('server is running on 8888')
});