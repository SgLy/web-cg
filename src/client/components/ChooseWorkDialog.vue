<template>
  <el-dialog
    :visible="display"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    title="欢迎来到工作区"
    width="70%"
  >
    <el-form ref="form" label-width="200px">
      <el-form-item label="新建一个项目，名称为：">
        <el-input v-model="newWorkname" placeholder="请输入项目名称"></el-input>
        <el-button type="primary" @click="onCreate">立即创建</el-button>
      </el-form-item>
    </el-form>
    <div class="or">或</div>
    <el-form ref="form" label-width="200px">
      <el-form-item label="打开一个已存在的项目：">
        <el-select v-model="openWorkId" placeholder="请选择项目">
          <el-option
            v-for="work in workList"
            :key="work.id"
            :label="work.name"
            :value="work.id"
          ></el-option>
        </el-select>
        <el-button type="primary" @click="onOpen">立即打开</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
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