<template>
  <div>
    <ElTabs
      editable
      :value="currentFile"
      @edit="onFileChange"
      @tab-click="onTabClick"
    >
      <ElTabPane
        v-for="item in files"
        :key="item.filename"
        :label="item.filename + (item.notSaved ? ' *' : '')"
        :name="item.filename"
      />
    </ElTabs>
    <NewFileDialog
      :visible="newFileDialogVisible"
      @close="onNewFileDialogClose"
      @newfile="onNewFile"
    />
    <DeleteFileDialog
      :visible="deleteFileDialogVisible"
      :filename="toDeleteFilename"
      @close="onDeleteFileDialogClose"
      @deletefile="onDeleteFile"
    />
    <div id="editor" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import * as monaco from 'monaco-editor';
  import {createApi} from '../../api';
  import utils from '../../utils';
  import { mapMutations, mapActions, mapGetters } from 'vuex';
  import NewFileDialog from './NewFileDialog.vue';
  import DeleteFileDialog from './DeleteFileDialog.vue';

  const api = createApi();

  export default Vue.extend({
    components: {
      NewFileDialog,
      DeleteFileDialog,
    },
    data() {
      return {
        newFileDialogVisible: false,
        deleteFileDialogVisible: false,
        toDeleteFilename: '',
      };
    },
    computed: {
      ...mapGetters([ 'files', 'currentFile' ]),
    },
    async mounted() {
      this.initEditor(document.getElementById('editor'));
      const editor = this.$store.state.editor;
      editor.onDidChangeModelContent(e => {
        this.editorOnChange({ content: editor.getValue() });
      });
    },
    methods: {
      onTabClick(e) {
        const i = this.files.findIndex(f => f.filename === e.paneName);
        this.switchCode(i);
      },
      onFileChange(targetName, action) {
        if (action === 'add') {
          this.newFileDialogVisible = true;
        } else if (action === 'remove') {
          this.toDeleteFilename = targetName;
          this.deleteFileDialogVisible = true;
        }
      },
      onNewFileDialogClose() {
        this.newFileDialogVisible = false;
      },
      async onNewFile(newfile) {
        const res = await this.addCode(newfile);
        if (res === 1) {
          this.$notify({
            title: '新建文件成功',
            message: `文件 ${newfile.filename} 已创建`,
            type: 'success',
          });
        } else {
          this.$notify({
            title: '新建文件失败',
            message: `文件 ${newfile.filename} 创建失败`,
            type: 'error',
          });
        }
      },
      onDeleteFileDialogClose() {
        this.deleteFileDialogVisible = false;
      },
      async onDeleteFile() {
        const res = await this.deleteCode({
          filename: this.toDeleteFilename,
        });
        if (res === 1) {
          this.$notify({
            title: '删除文件成功',
            message: `文件 ${this.toDeleteFilename} 已被删除`,
            type: 'success',
          });
        } else {
          this.$notify({
            title: '删除文件失败',
            message: `文件 ${this.toDeleteFilename} 删除失败`,
            type: 'error',
          });
        }
      },
      ...mapMutations([ 'initEditor', 'switchCode' ]),
      ...mapActions([ 'editorOnChange', 'addCode', 'deleteCode' ]),
    },
  });
</script>

<style>
#editor {
  height: calc(100% - 30px);
}
.el-tabs .is-top>.el-tabs__nav-scroll {
  height: auto;
}
</style>