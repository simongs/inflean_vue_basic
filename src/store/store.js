
// core 라이브러리 다운, package.json의 라이브러리가 node_modules 디렉토리에 라이브러리 다운
import Vue from 'vue'
import Vuex from 'vuex'

// Vue의 플러그인이라는 기능
// 글로벌 펑셔널리티를 추가하고 싶을 때 사용
// 특정 컴포넌트(ex. TodoComponent) 에서 this.$store 라고 접근할 수 있게 해줌
Vue.use(Vuex);

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

export const store = new Vuex.Store({
    state : {
        headerText : "TODO It!", 
        todoItems : storage.fetch()
    },
    getters : {
        storedTodoItems(state) {
            return state.todoItems;
        }
    },
    mutations : {
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
});