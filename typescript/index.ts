function temp(template, name, cb) {
    console.log({template})
    console.log(name)
    console.log(cb())
}

var a: any = 'fff'
var c: number = 0
var b = function () {
    return 15
}

temp`i am fuck ${a} ,but ${b}`

a = 13
c = 'f'


function mm(name: string): void {
    return "gg"
}

mm('1')

class Person {
    name: any
    age: number
}

var person = new Person()
console.log(person.name = 1)
console.log(person.age = 1)


function mgg(a: string, b?: string, c: string = 'f') {
    console.log(a)
    console.log(b)
    console.log(c)
}

mgg('fff')