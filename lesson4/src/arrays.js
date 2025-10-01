const stringArray = ['cat', 'monkey', 'dog', 'panda', 'elephant', 'mouse'];
const numberArray = [10, 5, 20, 15, 30];
const booleanArray = [true, false, true, false, true];
const anyArray = ['text', 42, true, null, { name: 'Jane' }];


console.log('---------- 1) String array ----------');

console.log('Original String Array :', stringArray, '\n');

const filteredStrings = stringArray.filter(item => item.startsWith('m'));
console.log('Filtered Strings started with \'m\' :', filteredStrings, '\n');

const firstStringWithLength3 = stringArray.find(item => item.length == 3);
console.log('First string with length = 3 :', firstStringWithLength3, '\n');

const sortedByLengthStringArray = stringArray.sort((a, b) => a.length - b.length);
console.log('Sorted by length string array :', sortedByLengthStringArray, '\n');

const hasCat = stringArray.includes('cat');
console.log('Includes "cat":', hasCat, '\n');

const joinedStrings = stringArray.join(', ');
console.log('Joined Strings:', joinedStrings, '\n');

const updatedStringArray = [];
stringArray.forEach(item => {
    updatedStringArray.push(item + '_updated');
});
console.log('Updated String Array :', updatedStringArray, '\n');

const stringsToObjects = stringArray.map(item => ({'str': item, 'strLength': item.length}));
console.log('Converted String Array to Objects Array:', stringsToObjects, '\n');


console.log('---------- 2) Number array ----------');

console.log('Elements of numberArray:', numberArray, '\n');

const firstNumberGreaterThan15 = numberArray.find(num => num > 15);
console.log('First number > 15:', firstNumberGreaterThan15, '\n');

const sortedNumbers = numberArray.sort((a, b) => b - a);
console.log('Sorted Numbers:', sortedNumbers, '\n');

let sum = 0;
numberArray.forEach(item => sum += item);
console.log('Sum of numbers :', sum, '\n');

const doubledNumbers = numberArray.map(num => num * 2);
console.log('Doubled Numbers:', doubledNumbers, '\n');


console.log('// ---------- 3) Boolean array ----------');

console.log('Boolean array values:', booleanArray, '\n');

const trueValues = booleanArray.filter(val => val === true);
console.log('True Values:', trueValues, '\n');

const firstFalse = booleanArray.findIndex(val => val === false);
console.log('First false index:', firstFalse, '\n');

let countTrues = 0;
booleanArray.forEach(val => {
    if (val) countTrues++;
});
console.log('Count of trues :', countTrues, '\n');

const invertedBooleans = booleanArray.map(val => !val);
console.log('Inverted Booleans:', invertedBooleans, '\n');


console.log('---------- 4) Any/Mixed array ----------');

console.log('Any/Mixed array values:', anyArray, '\n');

const numbersOnly = anyArray.filter(item => typeof item === 'number');
console.log('Numbers Only from mixed Array:', numbersOnly, '\n');

const firstObject = anyArray.find(item => typeof item === 'object');
console.log('First Object in mixed Array:', firstObject, '\n');

const typeCount = {};
anyArray.forEach(item => {
    const type = item === null ? 'null' : typeof item;
    if (!typeCount[type]) {
        typeCount[type] = 0;
    }
    typeCount[type]++;
});
console.log('Info about mixed Array : \n', JSON.stringify(typeCount, null, 2));

const mapped = anyArray.map(item => {
    return {
        value: item,
        type: item === null ? 'null' : typeof item
    };
});
console.log('Object for mixed Array : \n', JSON.stringify(mapped, null, 2));

const anyArray2 = [{ b: 2 }, true, 'z'];
const mixedConcat = anyArray.concat(anyArray2);
console.log('Concat of 2 mixed Array:', mixedConcat, '\n');

const mixedAndBoolean = [...anyArray, ...booleanArray];
console.log('Combined mixed and Boolean Arrays', mixedAndBoolean);
