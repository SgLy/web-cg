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
  import { mapGetters, mapActions } from 'vuex';

  export default Vue.extend({
    name: 'App',
    components: {
      NavMenu,
    },
    computed: {
      ...mapGetters([ 'isLogin' ]),
    },
    data() {
      return {
        height: 'calc(100% - 70px)',
      };
    },
    methods: {
      ...mapActions([ 'getUserInfo' ]),
    },
    async mounted() {
      const navHeight = this.$refs.navMenu.$el.clientHeight;
      this.height = `calc(100% - ${navHeight + 3}px)`;

      if (this.isLogin) {
        const user = await this.getUserInfo();
        if (user.success === 1) {
          this.$notify({
            title: '浏览器 Cookies 登录成功',
            message: `欢迎您回来，${user.nickname}`,
            type: 'success',
          });
        } else {
          this.$notify({
            title: '浏览器 Cookies 过期',
            message: '请重新通过右上角用户窗口登录！',
            type: 'error',
          });
        }
      }
    },
  });
</script>