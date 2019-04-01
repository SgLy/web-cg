<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
    >
      <el-menu-item index="1" disabled>总览</el-menu-item>
      <el-menu-item index="2">工作区</el-menu-item>
      <el-popover
        placement="bottom-end"
        width="300"
        trigger="hover"
        v-model="popoverVisible"
      >
        <UserPopover />
        <div slot="reference" id="right_item" index="-1">我</div>
      </el-popover>
    </el-menu>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import UserPopover from './components/UserPopover.vue';

  export default Vue.extend({
    components: {
      UserPopover,
    },
    data() {
      return {
        activeIndex: '2',
        popoverVisible: false,
      };
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