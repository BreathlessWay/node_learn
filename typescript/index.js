function temp(template, name, cb) {
    console.log({ template: template });
    console.log(name);
    console.log(cb());
}
var a = 'fff';
var c = 0;
var b = function () {
    return 15;
};
(_a = ["i am fuck ", " ,but ", ""], _a.raw = ["i am fuck ", " ,but ", ""], temp(_a, a, b));
a = 13;
c = 'f';
function mm(name) {
    return "gg";
}
mm('1');
var Person = (function () {
    function Person() {
    }
    return Person;
}());
var person = new Person();
console.log(person.name = 1);
console.log(person.age = 1);
function mgg(a, b, c) {
    if (c === void 0) { c = 'f'; }
    console.log(a);
    console.log(b);
    console.log(c);
}
mgg('fff');
var PP = (function () {
    function PP() {
    }
    PP.prototype.eat = function () {
        console.log(this.name);
    };
    return PP;
}());
var p1 = new PP();
p1.name = 'yfge';
p1.eat();
var _a;
