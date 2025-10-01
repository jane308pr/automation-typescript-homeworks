const numberA = 5;
const stringA = 'cat';
const stringB = '15';
const booleanA = true;
let sum = numberA + booleanA;
let difference = stringB - numberA - booleanA;

sum += stringA.length;
difference = difference++;


switch (sum + difference) {
    case 17: {
        console.log('sum = ', sum);
        console.log('difference = ', difference);
        console.log('sum + difference = 17');
        sum = ++sum;
        break;
    }
    case 18: {
        console.log('sum =', sum);
        console.log('difference = ', difference);
        console.log('sum + difference = 18');
        sum = ++sum;
        break;
    }
    case 19: {
        console.log('sum =', sum);
        console.log('difference = ', difference);
        console.log('sum + difference = 19');
        sum = ++sum;
        break;
    }
    default: {
        console.log('sum =', sum);
        console.log('difference = ', difference);
        console.log('default: sum + difference =', sum + difference);
        break;
    }
}

console.log('sum =', sum);
console.log('difference = ', difference);
