<template>
  <div>
   <ElTabs
      type="border-card"
      id="dashboard"
      tabPosition="left"
      :style="{ height: this.height }"
    >
      <ElTabPane label="课程">
        <Course />
      </ElTabPane>
      <ElTabPane label="作业">
        <Assignment />
      </ElTabPane>
      <ElTabPane label="设置">
        <PersonalSetting />
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import Course from './Course.vue';
  import Assignment from './Assignment.vue';
  import PersonalSetting from './PersonalSetting.vue';

  export default Vue.extend({
    name: 'Dashboard',
    components: {
      Course,
      Assignment,
      PersonalSetting,
    },
    props: {
      height: String,
    },
  });
</script>

<style scoped>
</style>