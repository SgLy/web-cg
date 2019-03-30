<template>
  <div>
    <ChooseWorkDialog
      :display="workId === 0"
    />
    <el-tabs
      type="border-card"
      id="workspace"
      tabPosition="left"
      :style="{ height: this.height }"
      @tab-click="onTabClick"
    >
      <el-tab-pane label="代码">
        <Editor />
      </el-tab-pane>
      <el-tab-pane label="输出">
        <iframe id="canvas" :src="compiledSrc"></iframe>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Editor from './Editor.vue';
  import ChooseWorkDialog from './components/ChooseWorkDialog.vue';
  import { mapActions, mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'Workspace',
    props: {
      height: String,
    },
    components: {
      Editor,
      ChooseWorkDialog,
    },
    computed: {
      ...mapGetters([ 'workId', 'userId', 'compiledSrc' ]),
    },
    async mounted() {
      const workId = this.$route.params.workId as number;
      if (workId) {
        await this.getWork({ workId });
      } else {
        await this.getWorkList({ userId: this.userId });
      }
    },
    methods: {
      onTabClick(tab) {
        if (parseInt(tab.index, 10) === 1) {
          const iframe = document.getElementById('canvas') as HTMLIFrameElement;
          iframe.src = iframe.src;
        }
      },
      ...mapActions([ 'getWork', 'getWorkList' ]),
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