import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(Vuex);
Vue.use(ElementUI);

import store from './store';

const root = document.createElement('div');
document.body.appendChild(root);

const app = new Vue({
  store,
  render: h => h(App),
}).$mount(root);
