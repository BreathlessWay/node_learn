/**
 * Created by Administrator on 2017/7/4.
 */
const http = require('http');
const fs = require('fs');

http.get('http://localhost:8088/', data => {
  data.setEncoding('utf8');
  let rawData = '';
  data.on('data', (chunk) => {
    fs.appendFile('sina.html', chunk);
  });
  data.on('end', () => {
    try {
      console.log(rawData);
    } catch (e) {
      console.error(e);
    }
  });
}).on('error', error => {
  console.log(error);
});