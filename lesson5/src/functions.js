const stringArray = ['cat', 'monkey', 'dog', 'panda', 'elephant', 'mouse'];
const numberArray = [10, 5, 20, 15, 30];
const mixedArray = [20, 'cat', 'monkey', 10, 5];

function calcArraySum(arr) {
    let sum = typeof(arr[1]) === 'string' ? '' : 0;
    arr.forEach(item => sum += item);
    console.log('Sum of array :', sum, '\n');
}

calcArraySum(stringArray);
calcArraySum(numberArray);
calcArraySum(mixedArray);
