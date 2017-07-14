/**
 * Created by Admin on 2017/7/14.
 */
const os = require('os');
const path = require('path');
const dns = require('dns');
console.log(path.resolve('', 'index.js'));

console.log(path.join('views', 'index.js'));

dns.lookup('sina.cn', function onLookup(err, address, family) {
  console.log('ip 地址:', address);
  dns.reverse(address, function (err, hostnames) {
    if (err) {
      console.log(err.code);
    }

    console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames));
  });
});