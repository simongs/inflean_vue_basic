<template>
    <div id="app">
        <TodoHeader></TodoHeader>
        <!-- <TodoInput v-on:하위컴포넌트에서발생시킨이벤트이름="해당 컴포넌틔의 메소드명"></TodoInput> -->
        <TodoInput v-on:addTodoEmitEvent="addOneItem"></TodoInput>
        <!-- <TodoList v:bind=내려보낼 프롭스 데이터 속성="하위컴포넌트에서 받을 프롭스이름"></TodoList>--> 
        <TodoList v-bind:propsData="todoItems" 
                  v-on:deleteTodoItem="deleteOneItem" 
                  v-on:toggleTodoItem="toggleOneItem">
        </TodoList>
        <TodoFooter v-on:deleteAllTodoItem="deleteAllItem"></TodoFooter>
    </div>  
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoFooter from './components/TodoFooter.vue'
import TodoList from './components/TodoList.vue'
import TodoInput from './components/TodoInput.vue'

export default {
    data: function () {
      return {
        todoItems : []
      }  
    },
    components : {
        'TodoHeader' : TodoHeader,
        'TodoInput' : TodoInput,
        'TodoList' : TodoList,
        'TodoFooter' : TodoFooter
    }, 
    methods : {
      addOneItem : function(newTodoItem) {
        var obj = {completed: false, item: newTodoItem};
        localStorage.setItem(newTodoItem, JSON.stringify(obj));
        this.todoItems.push(obj);  
      }, 

      deleteOneItem : function(todoItem, index) {
        localStorage.removeItem(todoItem.item);
        this.todoItems.splice(index, 1); // index부터 1개를 지우겠다.
      }, 

      toggleOneItem : function(todoItem, index) {
        // 로컬스토리지 쪽은 업데이트 기능이 없다 (삭제 + 삽입)
        // (안티패턴이다) - 컨테이너로 내린 데이터가 다시 올라와서 컨테이너에서 수정되는 것은 좋지 않다.
        // todoItem.completed = !todoItem.completed;
        this.todoItems[index].completed = !todoItem.completed;

        localStorage.removeItem(todoItem.item);
        localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
      },
      deleteAllItem : function() {
        localStorage.clear();
        this.todoItems = [];
      }
    },
    // APP.vue 가 생성되자마자 todoItems 초기화
    // vue 라이프사이클이 있는데 그중에 인스턴스 생성 후 바로 호출되는 hook method
    created: function () {
      console.log("TodoList created called");
      if (localStorage.length > 0) {
        for (var i=0; i < localStorage.length; i++) {
          if (localStorage.key(i) != 'loglevel:webpack-dev-server') {
            this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));  
          }
        }
      }
    },
}
</script>

<style>
body {
    text-align: center;
    background-color: #f6f6f6;
}
input{
  border-style: groove;
  width: 200px;
}
button{
  border-style: groove;
}
.shadow{
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}

</style>