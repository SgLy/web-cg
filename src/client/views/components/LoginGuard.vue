<template>
  <div>
    <div v-if="!isLogin" style="padding: 1em;">请先登录！</div>
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'LoginGuard',
    computed: {
      ...mapGetters([ 'isLogin' ]),
    },
  });
</script>

<style scoped>
</style>