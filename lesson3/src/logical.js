const numberA = 5;
const numberB = 10;
const stringA = '5';
const booleanA = true;
const booleanB = false;
const emptyValue = null;

console.log('\n----Comparison operations-----\n');

console.log('numberA > numberB:', numberA > numberB);
console.log('numberA < numberB:', numberA < numberB);
console.log('numberA >= 5:', numberA >= 5);
console.log('numberB <= 10:', numberB <= 10);

console.log('numberA == stringA:', numberA == stringA);
console.log('numberA === stringA:', numberA === stringA);

console.log('booleanA == 1:', booleanA == 1);
console.log('booleanA === 1:', booleanA === 1);

console.log('emptyValue == undefined:', emptyValue == undefined);
console.log('emptyValue === undefined:', emptyValue === undefined);

console.log('\n----Logical operations-----\n');

console.log('booleanA && booleanB:', booleanA && booleanB);
console.log('booleanA && (numberA > 0):', booleanA && (numberA > 0));
console.log('booleanB > 0:', booleanB > 0);

console.log('booleanA || booleanB:', booleanA || booleanB);
console.log('booleanB || (numberB < 5):', booleanB || (numberB < 5));

console.log('!booleanA:', !booleanA);
console.log('!booleanB:', !booleanB);

console.log('(numberA < numberB) && booleanA:', (numberA < numberB) && booleanA);
console.log('!(numberB === 10) || (stringA === \'5\'):', !(numberB === 10) || (stringA === '5'));


