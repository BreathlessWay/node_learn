/**
 * Created by Admin on 2017/6/28.
 */
const fs = require('fs');
const {exec} = require('child_process');
const querystring = require('querystring');
const formidable = require('formidable');
const util = require('util');

const start = (response) => {
  console.log('start server');
  const body = fs.readFileSync('./index.html');
  response.writeHead(200, {
    'Content-type': 'text/html'
  });
  response.write(body);
  response.end();
};

const upload = (response, postData) => {
  response.writeHead(200, {
    'Content-type': 'text/plain'
  });
  response.write(querystring.parse(postData).text);
  response.end();
};

const uploadFile = (response, request) => {
  const form = new formidable.IncomingForm();
  form.parse(request, function(err, fields, files) {
    console.log(files.file.path);
    fs.renameSync(files.file.path, './1.jpg');
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('received image:<br/>');
    response.write('<img src=\'/show\' />');
    response.end();
  });
};

const show = (response, request) => {
  fs.readFile('./1.jpg', 'binary',
      function(error, file) {
        if (error) {
          response.writeHead(500, {'Content-Type': 'text/plain'});
          response.write(error + '\n');
          response.end();
        } else {
          response.writeHead(200, {'Content-Type': 'image/png'});
          response.write(file, 'binary');
          response.end();
        }
      });
};

const sleep = (response) => {
  exec('dir', {encoding: 'gbk'}, (error, stdout, stderr) => {
    if (error) {
      response.writeHead(404, {
        'Content-type': 'text/plain'
      });
      response.write('404 no found');
      response.end();
    } else {
      console.log(stderr);
      console.log(stdout);
      response.writeHead(200, {
        'Content-type': 'text/plain'
      });
      response.write(stdout);
      response.end();
    }
  });
};

exports.start = start;
exports.upload = upload;
exports.uploadFile = uploadFile;
exports.show = show;
exports.sleep = sleep;