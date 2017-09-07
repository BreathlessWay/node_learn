/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-07 15:45:45
 * @version $Id$
 */

const app = require('express')();
const socketIO = require('socket.io');
const http = require('http');

app
	.get('/', (req, res) => {
		res.sendFile('index.html', {
			root: __dirname
		});
	})

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
	socket.on('error', (err) => {
		console.log(err)
	})
	socket.broadcast.to('chart').emit('message','fuck you');
	socket.emit('message', 'fuck off')
	socket.on('message', function(data) {
		//收到消息
		console.log({
			data
		});
	});
})


server.listen(8000, () => {
	console.log('server is running on 8000')
})