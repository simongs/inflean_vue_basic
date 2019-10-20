<template>
    <div id="app">
        <TodoHeader />
        <TodoInput /> <!-- <TodoInput v-on:하위컴포넌트에서발생시킨이벤트이름="해당 컴포넌틔의 메소드명"></TodoInput> -->
        <TodoList /> <!-- <TodoList v:bind=내려보낼 프롭스 데이터 속성="하위컴포넌트에서 받을 프롭스이름"></TodoList>--> 
        <TodoFooter />
    </div>  
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoFooter from './components/TodoFooter.vue'
import TodoList from './components/TodoList.vue'
import TodoInput from './components/TodoInput.vue'

export default {
    components : {
        TodoHeader, // 'TodoHeader' : TodoHeader
        TodoInput,
        TodoList,
        TodoFooter
    }
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