
// core 라이브러리 다운, package.json의 라이브러리가 node_modules 디렉토리에 라이브러리 다운
import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './comp/getters'
import * as mutations from './comp/mutations'

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
    getters : getters,
    mutations : mutations
});