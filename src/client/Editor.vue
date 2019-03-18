<template>
  <div>
    <el-tabs v-model="currentFile" editable @edit="onFileChange" >
      <el-tab-pane
        v-for="item in files"
        :key="item"
        :label="item"
        :name="item"
      />
    </el-tabs>
    <div id="editor" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import * as monaco from 'monaco-editor';
  import {createApi} from './api';
  import utils from './utils';

  const api = createApi();

  export default Vue.extend({
    components: {
    },
    data() {
      return {
        code: '',
        files: ['index.js', 'vertex.glsl', 'fragment.glsl'],
        currentFile: 'index.js',
      };
    },
    mounted() {
      const editor = monaco.editor.create(document.getElementById('editor'), {
        value: '',
        language: 'javascript',
        automaticLayout: true,
        readOnly: true,
      });
      api.work.getWork().then(response => {
        const codes = response.data.codes;
        this.files = codes.map(c => c.filename);
        this.currentFile = this.files[0];
        const models = codes.map(
          c => monaco.editor.createModel(c.content, c.type),
        );
        editor.setModel(models[0]);

        editor.updateOptions({ readOnly: false });
        editor.onDidChangeModelContent(e => {
          this.code = editor.getValue();
          this.updateCode();
        });
      });
    },
    methods: {
      updateCode: utils.throttle(300, function() {
        api.canvas.updateCode(this.code);
      }),
      onFileChange(targetName, action) {
        if (action === 'add') {
          const n = this.files.length;
          const newFilename = `${n}.js`;
          this.files.push(newFilename);
          this.currentFile = newFilename;
        } else if (action === 'remove') {
          const files = this.files as string[];
          const indexToDel = files.indexOf(targetName);
          let currentIndex = files.indexOf(this.currentFile);
          files.splice(indexToDel, 1);
          if (currentIndex === files.length) currentIndex = files.length - 1;
          this.currentFile = this.files[currentIndex];
        }
      },
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