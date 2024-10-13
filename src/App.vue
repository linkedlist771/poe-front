<template>
  <div class="app">
    <LeftSidebar />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import LeftSidebar from './components/LeftSidebar.vue';
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
  width: 100%;
}

.app {
  display: flex;
  height: 100%;
  width: 100%;
  font-family: Arial, sans-serif;
}
</style>