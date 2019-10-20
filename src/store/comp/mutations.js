

const addOneItem = (state, newTodoItem) => {
    const obj = {completed: false, item: newTodoItem};
    localStorage.setItem(newTodoItem, JSON.stringify(obj));
    state.todoItems.push(obj);  
}

const deleteTodoItem = (state, dataMap) => {
    localStorage.removeItem(dataMap.todoItem.item);
    state.todoItems.splice(dataMap.index, 1); // index부터 1개를 지우겠다.
} 

const toggleOneItem = (state, dataMap) => {
    // 로컬스토리지 쪽은 업데이트 기능이 없다 (삭제 + 삽입)
    // (안티패턴이다) - 컨테이너로 내린 데이터가 다시 올라와서 컨테이너에서 수정되는 것은 좋지 않다.
    // todoItem.completed = !todoItem.completed;
    state.todoItems[dataMap.index].completed = !dataMap.todoItem.completed;

    localStorage.removeItem(dataMap.todoItem.item);
    localStorage.setItem(dataMap.todoItem.item, JSON.stringify(dataMap.todoItem));
}

const deleteAllTodoItem = (state) => {
    localStorage.clear();
    state.todoItems = [];
}

export {addOneItem, deleteTodoItem, toggleOneItem, deleteAllTodoItem};