const num1 = 10;
const num2 = 3;
const str1 = '5';
const str2 = '2';
const boolTrue = true;
const boolFalse = false;
const valNull = null;
const valUndefined = undefined;

console.log('\n-----ADDITION (+)-----\n');

console.log('num1 + num2 =', num1 + num2);
console.log('str1 + str2 =', str1 + str2);
console.log('num1 + str1 =', num1 + str1);
console.log('boolTrue + boolFalse =', boolTrue + boolFalse);
console.log('valNull + num2 =', valNull + num2);
console.log('valUndefined + num2 =', valUndefined + num2);

console.log('\n-----SUBTRACTION (-)-----\n');

console.log('num1 - num2 =', num1 - num2);
console.log('str1 - str2 =', str1 - str2);
console.log('num1 - str1 =', num1 - str1);
console.log('num1 - boolTrue =', num1 - boolTrue);
console.log('num1 - valNull =', num1 - valNull);
console.log('num1 - valUndefined =', num1 - valUndefined);

console.log('\n-----MULTIPLICATION (*)-----\n');

console.log('num1 * num2 =', num1 * num2);
console.log('str1 * str2 =', str1 * str2);
console.log('num1 * str1 =', num1 * str1);
console.log('num2 * boolTrue =', num2 * boolTrue);
console.log('num1 * valNull =', num1 * valNull);
console.log('num1 * valUndefined =', num1 * valUndefined);

console.log('\n-----DIVISION (/)-----\n');

console.log('num1 / num2 =', num1 / num2);
console.log('str1 / str2 =', str1 / str2);
console.log('num1 / boolFalse =', num1 / boolFalse);
console.log('num1 / valNull =', num1 / valNull);

console.log('\n-----MODULUS (%)-----\n');

console.log('num1 % num2 =', num1 % num2);

console.log('\n-----EXPONENTIATION (**)-----\n');

console.log('num2 ** 3 =', num2 ** 3);
console.log('num1 ** num2 =', num1 ** num2);

console.log('\n-----ASSIGNMENT AND COMPOUND ASSIGNMENT-----\n');

let a = num1;
a += num2;
console.log('num1 += num2 =', a);
a = num1;
a -= num2;
console.log('num1 -= num2 =', a);
a = num1;
a *= num2;
console.log('num1 *= num2 =', a);
a = num1;
a /= num2;
console.log('num1 /= num2 =', a);

console.log('\n-----INCREMENT (++) AND DECREMENT (--)-----\n');

let b = num2;
console.log('b = num2 = ', b);
console.log('++b =', ++b);
b = num2;
console.log('b = num2 = ', b);
console.log('b++ =', b++);
console.log('b after b++ =', b);
b = num2;
console.log('b = num2 = ', b);
console.log('--b =', --b);
b = num2;
console.log('b = num2 = ', b);
console.log('b-- =', b--);
console.log('b after b-- =', b);
