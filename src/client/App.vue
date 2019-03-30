<template>
  <div>
    <NavMenu ref="navMenu" />
    <router-view :height="workspaceHeight" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import axios from 'axios';
  import NavMenu from './NavMenu.vue';
  import Workspace from './Workspace.vue';

  export default Vue.extend({
    name: 'App',
    components: {
      NavMenu,
      Workspace,
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