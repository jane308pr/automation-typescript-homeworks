async function getCompletedTodosForUser(userId) {
    try {
        const response = await fetch('http://jsonplaceholder.typicode.com/todos');
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

(async () => {
    await getCompletedTodosForUser(1);
    await getCompletedTodosForUser(2);
})();
