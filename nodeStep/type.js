/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-07 10:29:16
 * @version $Id$
 */

const say = (name) =>{
	return (text)=>{
		console.log(`${name} say ${text}`)
	}
}

say('tom')('commonAncestorContainer')