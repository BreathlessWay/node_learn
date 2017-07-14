/**
 * Created by Admin on 2017/7/14.
 */
const net = require('net');

const server = net.createServer(connection => {
  console.log('client connect');
  connection.on('end', () => {
    console.log('client closed');
  });
  connection.write('hello world');
  // connection.pipe(connection);
});
server.on('error', (err) => {
  console.log(err);
});
server.listen(3000, () => {
  console.log('net server is running');
});
