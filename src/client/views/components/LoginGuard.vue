<template>
  <div>
    <div v-if="!isLogin" style="max-width: 300px; padding: 1em;">
      <div class="text">请先登录后继续~</div>
      <UserForm />
    </div>
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
  import UserForm from './UserForm.vue';

  export default Vue.extend({
    name: 'LoginGuard',
    components: {
      UserForm,
    },
    computed: {
      ...mapGetters([ 'isLogin' ]),
    },
  });
</script>

<style scoped>
.text {
  color: #999;
  line-height: 1.4em;
  font-size: 14px;
  margin-left: 1em;
  margin-bottom: 10px;
}
</style>