<template>
  <ElDialog
    :visible="display"
    :show-close="true"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
    :before-close="onClose"
    title="提交作业"
    width="70%"
  >
    <div class="text">课程：{{ course }}</div>
    <div class="text">作业：{{ name }}</div>
    <div class="text">截止时间：{{ deadline }}</div>
    <div class="text">当前时间：{{ current }}</div>
    <div class="space"></div>
    <ElForm ref="form" label-width="180px">
      <ElFormItem label="选择一个项目作为作业：">
        <ElSelect v-model="submitWorkId" placeholder="请选择项目">
          <ElOption
            v-for="work in workList"
            :key="work.id"
            :label="work.name"
            :value="work.id"
          ></ElOption>
        </ElSelect>
        <ElButton type="primary" @click="onSubmit">提交</ElButton>
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import utils from '../../utils';

  export default Vue.extend({
    props: {
      display: Boolean,
      deadline: String,
      course: String,
      name: String,
    },
    data() {
      return {
        newWorkname: '',
        submitWorkId: null,
        current: utils.dateFormat(new Date(), 'YYYY-MM-DD HH:mm:SS'),
      };
    },
    computed: {
      ...mapGetters([ 'workList', 'userId' ]),
    },
    methods: {
      async onSubmit() {
        if (!this.submitWorkId) return;
        this.$emit('submit', this.submitWorkId);
        this.$emit('close');
      },
      onClose(done) {
        this.$emit('close');
        done();
      },
    },
  });
</script>

<style scoped>
.el-input, .el-select {
  margin-right: 10px;
  width: 70%;
}
.or {
  margin-bottom: 22px;
  width: 200px;
  text-align: center;
  opacity: 0.5;
}
.text {
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 10px;
  margin-left: 10px;
}
.space {
  margin-bottom: 40px;
}
</style>