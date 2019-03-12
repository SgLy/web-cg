<template>
  <div>
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
      };
    },
    mounted() {
      const editor = monaco.editor.create(document.getElementById('editor'), {
        value: '',
        language: 'javascript',
        automaticLayout: true,
      });

      editor.onDidChangeModelContent(e => {
        this.code = editor.getValue();
        this.updateCode();
      });

      api.canvas.getCode().then(response => {
        editor.setValue(response.data.code);
      });
    },
    methods: {
      updateCode: utils.throttle(300, function() {
        api.canvas.updateCode(this.code);
      }),
    },
  });
</script>

<style scoped>
#editor {
  height: calc(100% - 30px);
}
</style>