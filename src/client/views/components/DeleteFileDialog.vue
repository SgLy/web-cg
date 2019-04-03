<template>
  <el-dialog
    title="删除文件"
    :visible="visible"
    :before-close="onClose"
    width="50%"
  >
    <span>确定要删除文件<b><code> {{ filename }} </code></b>吗？删除后，代码将不能再恢复。</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      visible: Boolean,
      filename: String,
    },
    methods: {
      cancel() {
        this.$emit('close');
      },
      confirm() {
        this.$emit('deletefile');
        this.$emit('close');
      },
      onClose(done) {
        this.$emit('close');
        done();
      },
    },
  });
</script>