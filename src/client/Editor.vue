<template>
  <div>
    <div id="editor" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import * as monaco from 'monaco-editor';

  export default Vue.extend({
    components: {
    },
    data() {
      return {
        code: 'const noop = () => {}',
      };
    },
    mounted() {
      monaco.editor.create(document.getElementById('editor'), {
        value: [
          'function x() {',
          '\tconsole.log("Hello world!");',
          '}',
        ].join('\n'),
        language: 'javascript',
        automaticLayout: true,
      });
    },
  });
</script>

<style scoped>
#editor {
  height: calc(100% - 30px);
}
</style>