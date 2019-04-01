<template>
  <div>
    <NavMenu ref="navMenu" />
    <div v-if="!isLogin" style="padding: 1em;">请先登录！</div>
    <router-view v-else :height="workspaceHeight" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import axios from 'axios';
  import NavMenu from './NavMenu.vue';
  import Workspace from './Workspace.vue';
  import { mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'App',
    components: {
      NavMenu,
      Workspace,
    },
    computed: {
      ...mapGetters([ 'isLogin' ]),
    },
    data() {
      return {
        workspaceHeight: 'calc(100% - 70px)',
      };
    },
    methods: {},
    mounted() {
      const navHeight = this.$refs.navMenu.$el.clientHeight;
      this.workspaceHeight = `calc(100% - ${navHeight + 3}px)`;
    },
  });
</script>