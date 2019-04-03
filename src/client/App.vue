<template>
  <div>
    <NavMenu ref="navMenu" />
    <router-view :height="height" />
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
        height: 'calc(100% - 70px)',
      };
    },
    methods: {},
    mounted() {
      const navHeight = this.$refs.navMenu.$el.clientHeight;
      this.height = `calc(100% - ${navHeight + 3}px)`;
    },
  });
</script>