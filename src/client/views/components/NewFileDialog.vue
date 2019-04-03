<template>
  <el-dialog
    title="新建文件"
    :visible="visible"
    :before-close="onClose"
    width="50%"
  >
    <span>
      <el-form ref="form" label-width="80px">
        <el-form-item label="文件名">
          <el-input v-model="filename"></el-input>
        </el-form-item>
        <el-form-item label="文件类型">
          <el-select v-model="type" placeholder="请选择文件类型">
            <el-option label="JavaScript" value="javascript"></el-option>
            <el-option label="OpenGL Shading Language" value="glsl"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </span>
  </el-dialog>
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
      ...mapGetters([ 'filenames' ]),
    },
    methods: {
      cancel() {
        this.$emit('close');
      },
      confirm() {
        if (this.filenames.indexOf(this.filename) !== -1) {
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