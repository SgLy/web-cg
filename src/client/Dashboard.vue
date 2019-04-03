<template>
  <div>
   <el-tabs
      type="border-card"
      id="dashboard"
      tabPosition="left"
      :style="{ height: this.height }"
    >
      <el-tab-pane label="课程">
        <Course />
      </el-tab-pane>
      <el-tab-pane label="作业">
        <div>作业</div>
      </el-tab-pane>
      <el-tab-pane label="设置">
        <div>设置</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import Course from './Course.vue';

  export default Vue.extend({
    name: 'Dashboard',
    components: {
      Course,
    },
    props: {
      height: String,
    },
  });
</script>

<style scoped>
</style>