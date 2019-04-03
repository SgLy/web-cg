<template>
  <div>
    <UserForm v-if="!isLogin" />
    <div v-else></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import UserForm from './UserForm.vue';
  import { mapGetters } from 'vuex';

  export default Vue.extend({
    components: {
      UserForm,
    },
    computed: {
      ...mapGetters([ 'isLogin' ]),
    },
  });
</script>

<style scoped>
</style>