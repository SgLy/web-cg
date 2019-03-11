<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1" disabled>总览</el-menu-item>
    <el-menu-item index="2">工作区</el-menu-item>
    <el-menu-item index="-1"></el-menu-item>
    <el-menu-item id="right_item" index="3">我</el-menu-item>
  </el-menu>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  });
</script>

<style>
#right_item {
  float: right;
}
</style>