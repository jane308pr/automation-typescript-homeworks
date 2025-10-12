import { stringArray, numberArray, mixedArray, singleString, emptyArray } from './const/arrays';

function calcArraySum(array: (string | number)[]): void {
    if (array.length === 0) {
        console.log('Array is empty\n');
        return;
    }

    const firstType = typeof array[0];
    const isHomogeneous = array.every(item => typeof item === firstType);
    if (!isHomogeneous) {
        console.log('Array contains mixed types (both string and number)\n');
        return;
    }

    if (firstType === 'number') {
        const sum = (array as number[]).reduce((acc, num) => acc + num, 0);
        console.log('Sum of array:', sum, '\n');
    } else {
        const sum = (array as string[]).join('');
        console.log('Concatenated string:', sum, '\n');
    }
}

calcArraySum(stringArray);
calcArraySum(numberArray);
calcArraySum(singleString);
calcArraySum(mixedArray);
calcArraySum(emptyArray);
