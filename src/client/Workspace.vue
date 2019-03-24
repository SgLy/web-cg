<template>
  <el-tabs type="border-card" id="workspace" tabPosition="left" :style="{ height: this.height }" @tab-click="onTabClick">
    <el-tab-pane label="Code">
      <Editor />
    </el-tab-pane>
    <el-tab-pane label="Canvas">
      <iframe id="canvas" src="http://localhost:3000/api/compiled/1"></iframe>
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
    methods: {
      onTabClick(tab) {
        if (parseInt(tab.index, 10) === 1) {
          const iframe = document.getElementById('canvas') as HTMLIFrameElement;
          iframe.src = iframe.src;
        }
      },
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