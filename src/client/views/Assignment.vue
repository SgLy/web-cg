<template>
  <LoginGuard>
    <el-card shadow="hover" class="card"
      v-for="assignment in assignments" :key="assignment.id">
      <div slot="header">
        <span>{{ assignment.name }}</span>
        <el-button
          v-if="!assignment.registered"
          class="right"
          type="text"
        >参加该课程</el-button>
        <el-button
          v-else
          class="right"
          type="text"
          disabled
        >已参加</el-button>
      </div>
      <div class="text"><span class="subtitle">截止时间：</span>{{ assignment.deadlineStr }}</div>
      <div class="text"><span class="subtitle">课程：</span>{{ assignment.course.name }}</div>
      <div class="text">{{ assignment.description }}</div>
    </el-card>
  </LoginGuard>
</template>

<script lang="ts">
  import Vue from 'vue';
  import LoginGuard from './components/LoginGuard.vue';
  import { mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'Assignment',
    components: {
      LoginGuard,
    },
    computed: {
      ...mapGetters([ 'assignments' ]),
    },
  });
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
.right {
  float: right;
  padding: 3px 0;
}
.text {
  size: 14px;
  line-height: 1.4em;
  margin-bottom: 10px;
}
.text:last-child {
  margin-bottom: initial;
}
.subtitle {
  size: 13px;
  color: #999;
}
</style>