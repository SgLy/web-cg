<template>
  <ElDialog
    title="新建文件"
    :visible="visible"
    :before-close="onClose"
    width="50%"
  >
    <span>
      <ElForm ref="form" label-width="80px">
        <ElFormItem label="文件名">
          <ElInput v-model="filename"></ElInput>
        </ElFormItem>
        <ElFormItem label="文件类型">
          <ElSelect v-model="type" placeholder="请选择文件类型">
            <ElOption label="JavaScript" value="javascript"></ElOption>
            <ElOption label="OpenGL Shading Language" value="glsl"></ElOption>
          </ElSelect>
        </ElFormItem>
      </ElForm>
    </span>
    <span slot="footer" class="dialog-footer">
      <ElButton @click="cancel">取消</ElButton>
      <ElButton type="primary" @click="confirm">确定</ElButton>
    </span>
  </ElDialog>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters } from 'vuex';

  export default Vue.extend({
    props: {
      visible: Boolean,
    },
    data() {
      return {
        filename: 'index.js',
        type: 'javascript',
      };
    },
    computed: {
      ...mapGetters([ 'files' ]),
    },
    methods: {
      cancel() {
        this.$emit('close');
      },
      confirm() {
        if (this.files.findIndex(f => f.filename === this.filename) !== -1) {
          this.$message({
            message: `文件 ${this.filename} 已存在!`,
            type: 'warning',
          });
          return;
        }
        this.$emit('newfile', {
          filename: this.filename,
          type: this.type,
        });
        this.$emit('close');
      },
      onClose(done) {
        this.$emit('close');
        done();
      },
    },
  });
</script>