async function getCompletedTodosForUser(userId) {
    try {
        const response = await fetch('http://jsonplaceholder.typicode.com/todos/1');
        const allTodos = await response.json();
        return filterCompletedToDos(allTodos, userId);
    } catch {
        console.log('ALARM!!!');
    }
}

function filterCompletedToDos(json, userId) {
    const completedTodos = json.filter(todo => (todo.userId == userId && (todo.completed == true)));
    console.log(completedTodos);
}

getCompletedTodosForUser(1);
