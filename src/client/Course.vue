<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12"
        v-for="course in courses"
        :key="course.id"
      >
        <el-card shadow="hover" class="card">
          <div slot="header">
            <span>{{ course.name }}</span>
            <el-button
              v-if="!course.registered"
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
          <div class="text"><span class="subtitle">任课教师：</span>{{ course.teacher }}</div>
          <div class="text">{{ course.description }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'Course',
    async mounted() {
      await this.getCourseList({
        offset: 0,
      });
    },
    computed: {
      ...mapGetters([ 'courses' ]),
    },
    methods: {
      ...mapActions([ 'getCourseList' ]),
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