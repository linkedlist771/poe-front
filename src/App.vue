<template>
  <div class="app">
    <LeftSidebar />
    <MainContent />
  </div>
</template>

<script setup lang="ts">
import LeftSidebar from './components/LeftSidebar.vue';
import MainContent from './components/MainContent.vue';
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow: hidden;
}

.app {
  display: flex;
  height: 100vh;
  width: 85vw; /* 确保使用整个视口宽度 */

  font-family: Arial, sans-serif;
}
</style>