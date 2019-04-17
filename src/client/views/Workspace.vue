<template>
  <LoginGuard>
    <ChooseWorkDialog
      :display="workId === 0"
    />
    <ElTabs
      type="border-card"
      id="workspace"
      tabPosition="left"
      :style="{ height: this.height }"
      @tab-click="onTabClick"
    >
      <ElTabPane label="代码">
        <Editor />
      </ElTabPane>
      <ElTabPane label="输出">
        <ElRow :gutter="20">
          <ElCol :span="16">
            <ElCard shadow="hover">
              <div class="title">渲染结果</div>
              <iframe id="canvas" :src="compiledSrc" :style="{ pointerEvents: mouseLocked ? 'all' : 'none' }"></iframe>
            </ElCard>
          </ElCol>
          <ElCol :span="8">
            <ElCard shadow="hover">
              <div class="title">控制面板</div>
              <div style="margin-bottom: 10px;">
                <ElButton @click="reloadIframe">重新载入</ElButton>
                <ElButton @click="lockMouse">捕获鼠标</ElButton>
              </div>
              <div class="text"><span class="subtitle">每秒渲染帧数：</span><code>{{ fps }}</code></div>
            </ElCard>
            <ElCard shadow="hover" :style="{ marginTop: 20 }">
              <div class="title">调试信息</div>
              <div class="console"><pre><code>{{ iframeConsole.join('\n') }}</code></pre></div>
            </ElCard>
          </ElCol>
        </ElRow>
      </ElTabPane>
      <ElTabPane label="设置">
        <ElButton @click="getRaw">下载打包代码</ElButton>
        <ElButton @click="getCompiled">下载已编译代码</ElButton>
      </ElTabPane>
    </ElTabs>
  </LoginGuard>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Editor from './components/Editor.vue';
  import ChooseWorkDialog from './components/ChooseWorkDialog.vue';
  import LoginGuard from './components/LoginGuard.vue';
  import { mapActions, mapGetters } from 'vuex';
  import utils from '../utils';

  export default Vue.extend({
    name: 'Workspace',
    props: {
      height: String,
    },
    components: {
      Editor,
      ChooseWorkDialog,
      LoginGuard,
    },
    data() {
      return {
        fps: 0,
        mouseLocked: false,
        iframeConsole: [],
      };
    },
    computed: {
      ...mapGetters([ 'workId', 'userId', 'compiledSrc', 'iframeDomain' ]),
    },
    async mounted() {
      document.title = 'Web CG - 工作区';

      const workId = this.$route.params.workId as number;
      if (workId) {
        await this.getWork({ workId });
      } else {
        await this.getWorkList();
      }

      // iframe communicating, also check out ./src/server/controller/core.ts
      window.addEventListener('message', e => {
        if (typeof e.data.action !== 'string') return;
        if (e.data.action === 'updateFPS') {
          const fps = parseInt(e.data.data.fps, 10);
          this.updateFPS(fps);
          return;
        }
        if (e.data.action === 'mouseUnlock') {
          this.mouseLocked = false;
          return;
        }
        const m = e.data.action.match(/^console.([a-z]+)$/);
        if (m) {
          if (m[1] === 'assert' && e.data.data[0] === true) return;
          this.iframeConsole.push(`[${m[1]}] ${e.data.data.join(' ')}`);
        }
      }, false);
    },
    methods: {
      updateFPS: utils.throttle(500, function(fps) {
        this.fps = fps;
      }),
      onTabClick(tab) {
        if (parseInt(tab.index, 10) === 1) {
          const iframe = document.getElementById('canvas') as HTMLIFrameElement;
          iframe.src = iframe.src;
          this.iframeConsole = [];
        }
      },
      reloadIframe() {
        const iframe = document.getElementById('canvas') as HTMLIFrameElement;
        iframe.src = iframe.src;
        this.iframeConsole = [];
      },
      lockMouse() {
        this.mouseLocked = true;
        const iframe = document.getElementById('canvas') as HTMLIFrameElement;
        iframe.contentWindow.postMessage({
          action: 'lockMouse',
        }, this.iframeDomain);
      },
      async getRaw() {
        await this.downloadRaw();
      },
      async getCompiled() {
        await this.downloadCompiled();
      },
      ...mapActions([ 'getWork', 'getWorkList', 'downloadRaw', 'downloadCompiled' ]),
    },
  });
</script>

<style scoped>
#canvas {
  border: none;
  height: calc(100% - 110px);
  width: 100%;
}
.title {
  font-size: 14px;
  line-height: 1.5em;
  margin-bottom: 20px;
}
.text {
  font-size: 14px;
  line-height: 1.4em;
}
.subtitle {
  font-size: 13px;
  color: #999;
}
</style>