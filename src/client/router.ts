import VueRouter from 'vue-router';
import Workspace from './Workspace.vue';
import Dashboard from './Dashboard.vue';

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/workspace/:workId?',
      component: Workspace,
      name: 'workspace',
    },
    {
      path: '/dashboard',
      component: Dashboard,
      name: 'dashboard',
    },
    {
      path: '/',
      redirect: '/dashboard',
    },
  ],
});
