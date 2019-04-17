<template>
  <div>
    <ElRow :gutter="20">
      <ElCol :span="8"
        v-for="course in courses"
        :key="course.id"
      >
        <ElCard shadow="hover" class="card">
          <div slot="header">
            <span>{{ course.name }}</span>
            <ElButton
              v-if="isLogin && !course.registered"
              @click="onClick(course)"
              class="right"
              type="text"
            >参加该课程</ElButton>
            <ElButton
              v-else-if="isLogin"
              class="right"
              type="text"
              disabled
            >已参加</ElButton>
          </div>
          <div class="text"><span class="subtitle">任课教师：</span>{{ course.teacher }}</div>
          <div class="text">{{ course.description }}</div>
        </ElCard>
      </ElCol>
    </ElRow>
    <ElDialog
      title="参加课程"
      :visible="registerDialogVisible"
      width="50%"
    >
      <span>确定要参加课程<b> {{ course.name }} </b>吗？</span>
      <span slot="footer" class="dialog-footer">
        <ElButton :disabled="loading" @click="onCancel">取消</ElButton>
        <ElButton :loading="loading" type="primary" @click="onConfirm">确定</ElButton>
      </span>
    </ElDialog>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import LoginGuard from './components/LoginGuard.vue';
  import { mapActions, mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'Course',
    components: {
      LoginGuard,
    },
    data() {
      return {
        course: {
          id: 0,
          name: '',
        },
        loading: false,
        registerDialogVisible: false,
      };
    },
    async mounted() {
      await this.getCourseList({ offset: 0 });
    },
    computed: {
      ...mapGetters([ 'courses', 'isLogin' ]),
    },
    mounted() {
      document.title = 'Web CG - 课程';
    },
    methods: {
      onClick(course: ICourse) {
        this.course.id = course.id;
        this.course.name = course.name;
        this.registerDialogVisible = true;
      },
      onCancel() {
        this.registerDialogVisible = false;
      },
      async onConfirm() {
        this.loading = true;
        const res = await this.registerCourse({
          courseId: this.course.id,
        });
        if (res.success === 1) {
          this.loading = false;
          this.registerDialogVisible = false;
          this.$notify({
            title: '参加课程成功',
            content: `成功参加课程 ${this.course.name}`,
            type: 'success',
          });
        } else {
          this.loading = false;
          this.$notify({
            title: '参加课程失败',
            content: '发生了错误',
            type: 'error',
          });
        }
      },
      ...mapActions([ 'getCourseList', 'registerCourse' ]),
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