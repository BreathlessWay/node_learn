/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-07 10:46:54
 * @version $Id$
 */

const mongoose = require('mongoose');

const dbConnect = mongoose.connect('mongodb://localhost:27017/HUIZHI', {
	useMongoClient: true
});

const db = mongoose.connection

db.once('open', () => {
	console.log('连接成功')
})

db.on('error', (err) => {
	console.log(err)
})

db.once('disconnected', () => {
	console.log('断开连接')
})


const schema = new mongoose.Schema({
	name: {
		type: String,
		defaule: 'fuck'
	},
	age: {
		type: Number,
		required: true,
		max: 30,
		min: 10
	},
	sex: {
		type: String,
		defaule: '女'
	}
})

schema.pre('save', function(next) {
	console.log(this.isNew)
	next();
})

schema.methods.intro = function() {
	console.log(`My name is ${this.name} I am ${this.age}`)
};

schema.method('say', () => {
	console.log({
		that: this
	})
})

schema.static('stc', (...arg) => {
	console.log(...arg)
})

const Model = mongoose.model('HUIZHI', schema)


const data = new Model({
	name: 'hehe',
	age: '50'
})

data.save((err, doc) => {
	if (err) {
		console.log({
			err: err.errors.age.message
		})
		mongoose.disconnect()
	} else {
		console.log({
			doc
		})
		data.intro()
		data.say()
		Model.stc(data)
		Model.update({
			_id: '59b0e9b129a1b03ef40afa59'
		}, {
			sex: '女'
		}, (err, data) => {
			if (err) {
				console.log(err)
			} else {
				console.log(data)
				Model.remove({
					_id: '59b0ecba1a5c0a17348eef10'
				}, (err) => {
					if (err) {
						console.log(err)
					} else {
						Model
							.find({})
							.limit(3)
							.skip(3)
							.exec((err, data) => {
								console.log(data)
								mongoose.disconnect()
							})
					}
				})
			}
		})
	}
})