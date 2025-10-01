const numberA = 5;
const stringA = 'cat';
const booleanA = true;
const stringB = '15';
let sum = numberA + booleanA;
let difference = stringB - numberA - booleanA;

console.log('---------if-else----------');

if ((numberA + stringB) > 100) {
    console.log('variable\'s sum =', numberA + stringB, '> 100');
} else {
    console.log('nothing to show');
}

console.log('---------else if with comparisons----------');
console.log('sum = ', sum);
console.log('difference = ', difference);

if ((sum)  > 100) {
    console.log('variable\'s sum is', sum, '> 100');
} else if ((difference) > 100) {
    console.log('the difference between the variables is:', difference, '> 100');
} else if (stringB === 15) {
    console.log('true without type casting');
} else if (stringB == 15) {
    console.log('true with type casting');
}

console.log('---------else if with logical operations----------');

sum += stringA.length;
difference = difference++;
console.log('sum = ', sum);
console.log('difference = ', difference);

if (sum == difference && !booleanA) {
    console.log('true in first condition');
} else if (sum != difference || !booleanA) {
    console.log('true in second condition');
} else if ((sum == 9 || booleanA) && sum + difference == 18) {
    console.log('true in third condition');
} else {
    console.log('nothing to show');
}

console.log('---------shortcated if-else----------');

const x = sum == difference ? --sum : 'sum and difference is not equal';
console.log('x = ', x);
