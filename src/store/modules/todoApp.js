
const storage = {
    fetch() { // fetch : function () { 과 같다
        const arr = [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) != 'loglevel:webpack-dev-server') {
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));  
                }
            }
        }
        return arr;
    }
}

const state = {
    headerText : "TODO It!", 
    todoItems : storage.fetch()
}

const getters = {
    storedTodoItems(state) {
        return state.todoItems;
    }
}

const mutations = {
    addOneItem(state, newTodoItem) {
        const obj = {completed: false, item: newTodoItem};
        localStorage.setItem(newTodoItem, JSON.stringify(obj));
        state.todoItems.push(obj);  
    },
    
    deleteTodoItem(state, dataMap) {
        localStorage.removeItem(dataMap.todoItem.item);
        state.todoItems.splice(dataMap.index, 1); // index부터 1개를 지우겠다.
    },
    
    toggleOneItem(state, dataMap) {
        // 로컬스토리지 쪽은 업데이트 기능이 없다 (삭제 + 삽입)
        // (안티패턴이다) - 컨테이너로 내린 데이터가 다시 올라와서 컨테이너에서 수정되는 것은 좋지 않다.
        // todoItem.completed = !todoItem.completed;
        state.todoItems[dataMap.index].completed = !dataMap.todoItem.completed;
    
        localStorage.removeItem(dataMap.todoItem.item);
        localStorage.setItem(dataMap.todoItem.item, JSON.stringify(dataMap.todoItem));
    },
    
    deleteAllTodoItem(state) {
        localStorage.clear();
        state.todoItems = [];
    }
}

export default {
    state,
    getters,
    mutations
}