<template>
  <LoginGuard>
    <ElCard shadow="hover" class="card"
      v-for="assignment in assignments.filter(a => !passed(a.deadline))" :key="assignment.id">
      <div slot="header">
        <span>{{ assignment.name }}</span>
        <ElButton
          v-if="assignment.submission.submitTime"
          class="right"
          type="text green"
          @click="openSubmitWindow(assignment)"
        >已提交</ElButton>
        <ElButton
          v-else-if="passed(assignment.deadline)"
          class="right red"
          type="text"
          @click="openSubmitWindow(assignment)"
        >已过期</ElButton>
        <ElButton
          v-else
          class="right"
          type="text"
          @click="openSubmitWindow(assignment)"
        >提交作业</ElButton>
      </div>
      <div class="text"><span class="subtitle">截止时间：</span>{{ assignment.deadlineStr }}（{{ compareNow(assignment.deadline) }}）</div>
      <div class="text"><span class="subtitle">提交时间：</span>{{ assignment.submission.submitTimeStr || '未提交' }}</div>
      <div class="text"><span class="subtitle">课程：</span>{{ assignment.course.name }}</div>
      <div class="text">{{ assignment.description }}</div>
    </ElCard>

    <div style="text-align: center; padding: 1em; color: #999;">- 已过期 -</div>
    <ElCard shadow="hover" class="card"
      v-for="assignment in assignments.filter(a => passed(a.deadline))" :key="assignment.id">
      <div slot="header">
        <span>{{ assignment.name }}</span>
        <ElButton
          v-if="assignment.submission.submitTime"
          class="right"
          type="text green"
        >已提交</ElButton>
        <ElButton
          v-else-if="passed(assignment.deadline)"
          class="right red"
          type="text"
        >已过期</ElButton>
        <ElButton
          v-else
          class="right"
          type="text"
        >提交作业</ElButton>
      </div>
      <div class="text"><span class="subtitle">截止时间：</span>{{ assignment.deadlineStr }}（{{ compareNow(assignment.deadline) }}）</div>
      <div class="text"><span class="subtitle">提交时间：</span>{{ assignment.submission.submitTimeStr || '未提交' }}</div>
      <div class="text"><span class="subtitle">课程：</span>{{ assignment.course.name }}</div>
      <div class="text">{{ assignment.description }}</div>
    </ElCard>
    <SubmitAssignmentDialog
      :display="submitWindowOpen"
      :deadline="submitting.deadlineStr"
      :course="submitting.course.name"
      :name="submitting.name"
      @close="submitWindowClose"
      @submit="onSubmit"
    />
  </LoginGuard>
</template>

<script lang="ts">
  import Vue from 'vue';
  import LoginGuard from './components/LoginGuard.vue';
  import SubmitAssignmentDialog from './components/SubmitAssignmentDialog.vue';
  import { mapGetters, mapActions } from 'vuex';
  import utils from '../utils';

  export default Vue.extend({
    name: 'Assignment',
    components: {
      LoginGuard,
      SubmitAssignmentDialog,
    },
    computed: {
      ...mapGetters([ 'assignments' ]),
    },
    mounted() {
      // document.title = 'Web CG - 作业';
    },
    data() {
      return {
        submitWindowOpen: false,
        submitting: {
          course: {},
        },
      };
    },
    methods: {
      passed(t: string) {
        const now = Date.now();
        const time = +new Date(t);
        return now > time;
      },
      compareNow(t: string) {
        if (this.passed(t)) return '已过期';
        return '剩余 ' + utils.timediffFormat(+new Date(t) - Date.now());
      },
      openSubmitWindow(assignment) {
        this.getWorkList();
        this.submitting = assignment;
        this.submitWindowOpen = true;
      },
      async onSubmit(workId) {
        const assignment = this.submitting;
        const res = await this.submitAssignment({
          workId, assignmentId: assignment.id,
        });
        if (res.success === 1) {
          this.$notify({
            title: '提交成功',
            message: `提交作业 ${assignment.name} 成功`,
            type: 'success',
          });
        } else {
          this.$notify({
            title: '提交失败',
            message: `提交作业 ${assignment.name} 错误`,
            type: 'error',
          });
        }
      },
      submitWindowClose() {
        this.submitWindowOpen = false;
      },
      ...mapActions([ 'getWorkList', 'submitAssignment' ]),
    },
  });
</script>

<style scoped>
.red {
  color: #f56c6c;
}
.green {
  color: #67c23a;
}
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