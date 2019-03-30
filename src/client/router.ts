import VueRouter from 'vue-router';
import Workspace from './Workspace.vue';

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/workspace/:workId?',
      component: Workspace,
    },
  ],
});
