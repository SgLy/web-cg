<template>
  <ElDialog
    title="删除文件"
    :visible="visible"
    :before-close="onClose"
    width="50%"
  >
    <span>确定要删除文件<b><code> {{ filename }} </code></b>吗？删除后，代码将不能再恢复。</span>
    <span slot="footer" class="dialog-footer">
      <ElButton @click="cancel">取消</ElButton>
      <ElButton type="primary" @click="confirm">确定</ElButton>
    </span>
  </ElDialog>
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