<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
    <!-- <button v-on:click="addTodo" class="addBtn">add</button> -->
    <span class="addContainer" v-on:click="addTodo">
      <i class="fas fa-plus addBtn"></i>
    </span>

    <modal v-if="showModal" @close="showModal = false">
    <!--
      you can use custom content here to overwrite
      default content
    -->
    <!-- slot 이란 무엇인가? 
      유용한 vue의 기능

    -->
    <h3 slot="header">경고!<i class="fas fa-times closeModalBtn" @click="showModal = false"></i></h3>
    <h3 slot="body"></h3>
    <h3 slot="footer"></h3>
  </modal>
  </div>
</template>

<script>
import Modal from './common/Modal.vue'

export default {
  components : {
    'modal' : Modal,
  },
  data() {
    return {
      newTodoItem: "",
      showModal: false
    }  
  },
  methods: {
    // save item
    addTodo() {
      if (this.newTodoItem !== '') {
        this.$emit('addTodoEmitEvent', this.newTodoItem);
        this.clearInput();
        this.showModal = false;
      } else {
        this.showModal = true;
      }
    },

    // clear inputbox
    clearInput() {
      this.newTodoItem = "";
    }
  }
}
</script>

<style scoped>
  input:focus{
      outline: none;
  }
  .inputBox{
      background: white;
      height: 50px;
      line-height: 50px;
      border-radius: 5px;
  }
  .inputBox input{
      border-style: none;
      font-size: 0.9rem;
  }
  .addContainer{
      float: right;
      background: linear-gradient(to right, #6478fb, #8763fb);
      display: block;
      width: 3rem;
      border-radius: 0 5px 5px 0;
  }
  .addBtn{
      color: white;
      vertical-align: middle;
  }
  .closeModalBtn{
      color: #42b983;
  }

  .shadow{
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>