<template>
  <div>
    <ul>
      <li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem.item" class="shadow"> 
        <!-- 완료 처리 -->
        <i class="fas fa-check checkBtn" v-bind:class="{checkBtnCompleted: todoItem.completed}" v-on:click="toggleComplete(todoItem, index)"></i>

        <!-- 할일 내용 -->
        <span v-bind:class="{textCompleted: todoItem.completed}"> {{ todoItem.item }} </span>

        <!-- 삭제 처리 -->
        <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
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

  data : function() {
    return {
      todoItems : []
    }
  },

  methods : {
    removeTodo: function(todoItem, index) {
      console.log("remove");
      console.log(todoItem);
      console.log(index);
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index, 1); // index부터 1개를 지우겠다.
    },
    toggleComplete : function(todoItem, index) {
      // 완료된 건들은 체크 완료 상태로 변경한다.
      todoItem.completed = !todoItem.completed;

      // 로컬스토리지 쪽은 업데이트 기능이 없다 (삭제 + 삽입)
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    }
  }


}
</script>

<style>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
/* transition css */
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>