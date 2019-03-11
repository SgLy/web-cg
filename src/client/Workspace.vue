<template>
  <el-tabs type="border-card" id="workspace" tabPosition="left" :style="{ height: this.height }">
    <el-tab-pane label="Code">
      <Editor />
    </el-tab-pane>
    <el-tab-pane label="Canvas">
      <iframe id="canvas" src="http://localhost:3000/api/canvas/1"></iframe>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Editor from './Editor.vue';

  export default Vue.extend({
    name: 'Workspace',
    props: {
      height: String,
    },
    components: {
      Editor,
    },
  });
</script>

<style scoped>
#canvas {
  border: none;
  height: calc(100% - 30px);
  width: 100%;
}
</style>