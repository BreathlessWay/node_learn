/**
 * Created by Admin on 2017/7/14.
 */
// const os = require('os');
// const path = require('path');
// const dns = require('dns');
// console.log(path.resolve('', 'index.js'));
//
// console.log(path.join('views', 'index.js'));
//
// dns.lookup('sina.cn', function onLookup(err, address, family) {
//   console.log('ip 地址:', address);
//   dns.reverse(address, function (err, hostnames) {
//     if (err) {
//       console.log(err.code);
//     }
//
//     console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames));
//   });
// });
// const os = require('os');
// const path = require('path');
// const dns = require('dns');
// console.log(path.resolve('', 'index.js'));

const app = require('express')();
// console.log(path.join('views', 'index.js'));

app.get('/', (res, req) => {
  req.status(200).send('200');
});

app.listen(3002, () => {
  console.log('http://localhost:3002');
// dns.lookup('sina.cn', function onLookup(err, address, family) {
//   console.log('ip 地址:', address);
//   dns.reverse(address, function (err, hostnames) {
//     if (err) {
//       console.log(err.code);
//     }

//     console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames));
//   });
// });

const fs = require('fs');

fs.readdir('C:/Users/Administrator/Desktop/Game', (err, files) => {
  if (err) throw err;
  const fileArray = [];
  files.forEach((list, index) => {
    const json = {};
    json.id = `img${index}`;
    json.src = `C:/Users/Administrator/Desktop/Game/${list}`;
    fileArray.push(JSON.stringify(json));
  });
  fs.appendFile('./fileList.json', fileArray);
});