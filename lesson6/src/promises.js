function getCompletedTodosForUser(userId) {
    return fetch('http://jsonplaceholder.typicode.com/todos/1')
        .then((response) => response.json())
        .then((json) => filterCompletedToDos(json, userId))
        .catch(() => console.log('ALARM!!!'));
}

function filterCompletedToDos(json, userId) {
    const completedTodos = json.filter(todo => (todo.userId == userId && (todo.completed == true)));
    console.log(completedTodos);
}

getCompletedTodosForUser(1);

