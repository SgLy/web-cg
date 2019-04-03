import VueRouter from 'vue-router';
import Workspace from './views/Workspace.vue';
import Dashboard from './views/Dashboard.vue';

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
