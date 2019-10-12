// 템플릿안에는 div가 하나만 있어야 한다.
<template>
  <div>
    <app-header 
      v-bind:dataString="str"
      v-on:pass="passToApp">
    </app-header>

    <form v-on:submit.prevent="submitForm">
      <div>
        <label for="userName">id: </label>
        <input id="userName" type="text" v-model="userName">
      </div>
      <div>
        <label for="password">pw: </label>
        <input id="password" type="password" v-model="password">
      </div>
      <button type="submit">login</button>
    </form>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import axios from 'axios'
// var AppHeader = { template = '<header><H1>Header</H1></header>'}

export default {
  data: function() {
    return {
      str: 'Header2',
      userName: '',
      password: ''
    }
  },
  components: {
    'app-header' : AppHeader
  },
  methods: {
    passToApp: function() {
      this.str = 'sim'
    },
    submitForm: function(event) {
      // form의 기본 동작이 새로고침이므로 이걸 막아주기 위해서 아래 구문을 쓴다. 기본 동작 수행하지 않도록 한다.
      // event.preventDefault(); //  일반 자바스크립트나 JQuery에서 하는 스타일 
      // 상단에 v-on:submit.prevent:
      
      console.log(this.userName, this.password);

      var url = 'https://jsonplaceholder.typicode.com/users';
      var data = {
        userName: this.userName,
        password: this.password
      }
      axios.post(url, data)
      .then(function(response) {
          console.log(response);
      })
      .catch(function(response) {
          console.log(response);
      });
    }
  }
}
</script>