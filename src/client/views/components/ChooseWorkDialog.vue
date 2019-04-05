<template>
  <ElDialog
    :visible="display"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    title="欢迎来到工作区"
    width="70%"
  >
    <ElForm ref="form" label-width="200px">
      <ElFormItem label="新建一个项目，名称为：">
        <ElInput v-model="newWorkname" placeholder="请输入项目名称"></ElInput>
        <ElButton type="primary" @click="onCreate">立即创建</ElButton>
      </ElFormItem>
    </ElForm>
    <div class="or">或</div>
    <ElForm ref="form" label-width="200px">
      <ElFormItem label="打开一个已存在的项目：">
        <ElSelect v-model="openWorkId" placeholder="请选择项目">
          <ElOption
            v-for="work in workList"
            :key="work.id"
            :label="work.name"
            :value="work.id"
          ></ElOption>
        </ElSelect>
        <ElButton type="primary" @click="onOpen">立即打开</ElButton>
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';

  export default Vue.extend({
    props: {
      display: Boolean,
    },
    data() {
      return {
        newWorkname: '',
        openWorkId: null,
      };
    },
    computed: {
      ...mapGetters([ 'workList', 'userId' ]),
    },
    methods: {
      async onCreate() {
        if (this.newWorkname === null || this.newWorkname.length === 0) {
          this.$message({
            message: '请输入项目名称！',
            type: 'warning',
          });
          return;
        }
        const res = await this.newWork({ name: this.newWorkname });
        if (res.success) {
          this.$notify({
            title: '新建项目成功',
            message: `成功新建项目 ${this.newWorkname}`,
            type: 'success',
          });
          this.$emit('close');
          await this.getWork({ workId: res.id });
          this.$router.push(`/workspace/${res.id}`);
        }
      },
      async onOpen() {
        if (!this.openWorkId) return;
        await this.getWork({ workId: this.openWorkId });
        this.$router.push(`/workspace/${this.openWorkId}`);
        const name = this.workList.find(w => w.id === this.openWorkId).name;
        this.$notify({
          title: '打开项目成功',
          message: `已打开项目 ${name}`,
          type: 'success',
        });
        this.$emit('close');
      },
      ...mapActions([ 'getWork', 'newWork', 'getWork' ]),
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
</style>