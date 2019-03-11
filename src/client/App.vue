<template>
  <div>
    <NavMenu ref="navMenu" />
    <Workspace :height="workspaceHeight" />
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
      console.log(navHeight);
      this.workspaceHeight = `calc(100% - ${navHeight + 3}px)`;
    },
  });
</script>