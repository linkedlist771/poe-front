<template>
  <a href="/list" class="github-link" target="_blank">
    <img src="@/assets/GitHub-Mark-ea2971cee799-8xquA8si.png" alt="GitHub">
  </a>
</template>

<script setup>
// 组合式 API 不需要导出默认对象
// 如果需要定义组件名称，可以使用 defineOptions
defineOptions({
  name: 'GitHubCorner'
})
</script>

<style scoped>
.github-link {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
  width: 48px;
  height: 48px;
}

.github-link img {
  width: 100%;
  border-radius: 50%;
}
</style>