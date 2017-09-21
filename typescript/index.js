var num = 1;
num = undefined;
var str = 'str';
str = null;
var arr = [1, 2, 3];
var array = [1, 2, 6];
console.log(num, str, arr, array);
var typeArr = ['ts', 4];
typeArr[0] = '2';
typeArr[3] = 6;
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var color = Color[2];
console.log(color);
var any = 1;
any = any.toFixed(1);
console.log(any);
var obj = 1;
// obj.toFixed(1);
console.log(obj);
var anyArr = [1, 'e', { a: 1 }];
anyArr[6] = true;
console.log(anyArr[6]);
var dy = '2222';
var dyLength = dy.length;
console.log(dyLength);
function foo() {
    // okay to capture 'a'
    return a;
}
// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
console.log(foo());
var a = 1;
var _a = [1, 3], one = _a[0], two = _a[1];
console.log(one);
function little(_a) {
    var name = _a.name, age = _a.age, food = _a.food;
    var a = { sex: 'female' };
    console.log("My name is " + name + " , i am " + (age || 0) + " years old , i like eat " + food);
    return a;
}
var p1 = { name: 'fuck', age: 10, food: [] };
console.log(little({ name: 'Mike', food: ['f', 't'] }));
var readOnlyArr = [1, 2];
function te(test) {
    console.log(test);
}
var nm = { color: 'red', padding: 1, size: 10 };
te(nm);
var func = function (sf, sd) {
    console.log(sf, sd);
};
func('1', 1);
