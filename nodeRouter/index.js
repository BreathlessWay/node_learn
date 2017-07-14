/**
 * Created by Admin on 2017/6/28.
 */
const server = require('./main');
const handle = require('./handle');
const router = require('./router');

const handlePost = {};
handlePost['/'] = handle.start;
handlePost['/start'] = handle.start;
handlePost['/upload'] = handle.upload;
handlePost['/sleep'] = handle.sleep;
handlePost['/uploadFile'] = handle.uploadFile;
handlePost['/show'] = handle.show;

server.start(handlePost, router.router);
