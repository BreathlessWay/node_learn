/**
 * Created by Admin on 2017/7/14.
 */
const net = require('net');

const client = net.connect('3000', 'localhost', () => {
  console.log('link to server');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('error', (err) => {
  console.log(err);
});
client.on('end', () => {
  console.log('stop link');
});