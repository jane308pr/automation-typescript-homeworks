async function getData(resource) {
    try {
        const response = await fetch(resource);
        const data = await response.json();
        console.log('Received test data:', data);
    } catch {
        throw new Error('Error: the program was not able to fetch test data');
    }
}

async function initializeTestData(resource, backup) {
    try {
        await getData(resource);
    } catch {
        await getData(backup);
    }
}

async function run() {
    const results = await Promise.allSettled([
        initializeTestData('http://blabla12345.com', 'http://jsonplaceholder.typicode.com/todos/1'),
        initializeTestData('http://blabla12345.com', 'http://blabla09876.com')
    ]);
    console.log(results);
}

run();
