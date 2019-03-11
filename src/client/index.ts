import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(Vuex);
Vue.use(ElementUI);

const root = document.createElement('div');
document.body.appendChild(root);

const app = new Vue({
  render: h => h(App),
}).$mount(root);
