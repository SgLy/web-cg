<template>
  <div>
    <el-menu
      :default-active="$route.name"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="dashboard" :route="dashboardRoute">总览</el-menu-item>
      <el-menu-item index="workspace" :route="workspaceRoute">工作区</el-menu-item>
      <el-popover
        placement="bottom-end"
        width="300"
        trigger="hover"
        v-model="popoverVisible"
      >
        <UserPopover />
        <div slot="reference" id="right_item" index="-1">{{ isLogin ? userNickname : '登录' }}</div>
      </el-popover>
    </el-menu>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
  import UserPopover from './views/components/UserPopover.vue';

  export default Vue.extend({
    components: {
      UserPopover,
    },
    data() {
      return {
        popoverVisible: false,
      };
    },
    computed: {
      dashboardRoute: () => '/dashboard',
      workspaceRoute() {
        return this.workId === 0 ? '/workspace' : `/workspace/${this.workId}`;
      },
      ...mapGetters([ 'isLogin', 'userNickname', 'workId' ]),
    },
  });
</script>

<style>
#right_item {
  float: right;
  height: 60px;
  line-height: 60px;
  margin: 0;
  font-size: 14px;
  color: #303133;
  padding: 0 20px;
  cursor: pointer;
}
</style>