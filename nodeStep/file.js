/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-08-31 14:37:25
 * @version $Id$
 */

const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
// readFile('./index.js').then((data) => {
// Do something with `stats`
// console.log(data.toString('utf8'))
// }).catch((error) => {
// Handle the error.
// });

(async function() {
    const data = readFile('./index.js')
    data.then((res)=>{
    	console.log(res.toString('utf8'))
    })
})()