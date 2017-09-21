let num: number = 1;
num = undefined;
let str: string = 'str';
str = null;
const arr: number[] = [1, 2, 3];
const array: Array<number> = [1, 2, 6];
console.log(num, str, arr, array);
const typeArr: [string, number] = ['ts', 4];
typeArr[0] = '2';
typeArr[3] = 6;

enum Color {Red = 1, Green, Blue}

let color: string = Color[2];

console.log(color);

let any: any = 1;
any = any.toFixed(1);
console.log(any);

let obj: Object = 1;
// obj.toFixed(1);
console.log(obj);

const anyArr: any[] = [1, 'e', {a: 1}];
anyArr[6] = true;
console.log(anyArr[6]);

const dy: any = '2222';
const dyLength: number = (<string>dy).length;
console.log(dyLength);

function foo () {
    // okay to capture 'a'
    return a;
}

// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
console.log(foo());

let a = 1;

const [one, two] = [1, 3];
console.log(one);

interface Person {
    readonly  name: string,
    age?: number,
    food: Array<string>
}

function little ({name, age, food}: Person): { sex: string } {
    let a = {sex: 'female'};
    console.log(`My name is ${name} , i am ${age || 0} years old , i like eat ${food}`);
    return a;
}

let p1: Person = {name: 'fuck', age: 10, food: []};

console.log(little({name: 'Mike', food: ['f', 't']}));

let readOnlyArr: ReadonlyArray<number> = [1, 2];

interface Test {
    color?: string;
    size?: number;

    [propName: string]: any
}

function te (test: Test) {
    console.log({...test});
}

te({color: 'red', padding: 1, size: 10});