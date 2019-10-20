import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store, // store : store, (ES6 feature)
}).$mount('#app')
