import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueRouter);

import store from './store';
import router from './router';

import initMonacoEdtior from './monaco';

initMonacoEdtior();

const root = document.createElement('div');
document.body.appendChild(root);

const app = new Vue({
  store,
  router,
  render: h => h(App),
}).$mount(root);
