<template>
    <div v-if="isOpen" class="overlay" @click="close"></div>
    <div class="plugin-panel" :class="{ 'panel-open': isOpen }">
        <div class="panel-header">
            <h2>Poe插件中心</h2>
            <button class="close-button" @click="close">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
            </button>
        </div>
        
        <div v-if="activePlugins.length > 0" class="active-plugins">
            <h3>已启用插件</h3>
            <div class="active-plugins-list">
                <div v-for="plugin in activePlugins" :key="plugin.id" class="active-plugin-item">
                    <img :src="plugin.icon" :alt="plugin.name" class="active-plugin-icon">
                    <span class="active-plugin-name">{{ plugin.name }}</span>
                    <button class="disable-button" @click="togglePlugin(plugin)">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="plugin-grid">
            <div v-for="plugin in plugins" 
                 :key="plugin.id" 
                 class="plugin-item"
                 :class="{ 'plugin-active': isPluginActive(plugin) }"
                 @click="togglePlugin(plugin)">
                <img :src="plugin.icon" :alt="plugin.name" class="plugin-icon">
                <h3>{{ plugin.name }}</h3>
                <p>{{ plugin.description }}</p>
                <div class="plugin-status">
                    {{ isPluginActive(plugin) ? '已启用' : '点击启用' }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
const activePlugins = ref<any[]>([]);

const plugins = [
    {
        id: 1,
        name: '联网搜索',
        description: '通过联网搜索，获取最新的信息和数据。',
        icon: '/path/to/weather-icon.png'
    },
    {
        id: 2,
        name: 'artifacts',
        description: '基于Vue3的artifacts， 支持交互式渲染',
        icon: '/path/to/bilibili-icon.png'
    },
    // 添加更多插件...
];

const isPluginActive = (plugin: any) => {
    return activePlugins.value.some(p => p.id === plugin.id);
};

const togglePlugin = (plugin: any) => {
    const index = activePlugins.value.findIndex(p => p.id === plugin.id);
    if (index === -1) {
        activePlugins.value.push(plugin);
    } else {
        activePlugins.value.splice(index, 1);
    }
};

const close = () => {
    isOpen.value = false;
};

defineExpose({
    isOpen,
    activePlugins
});
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 1001;
    transition: opacity 0.3s ease;
}

.plugin-panel {
    position: fixed;
    top: 0;
    right: -100%;
    width: 400px;
    height: 100vh;
    background: white;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    z-index: 1002;
    padding: 20px;
    box-sizing: border-box;
}

.panel-open {
    right: 0;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.close-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
}

.close-button svg {
    width: 24px;
    height: 24px;
}

.plugin-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    overflow-y: auto;
    max-height: calc(100vh - 100px);
}

.plugin-item {
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
}

.plugin-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    background-color: #f8f9fa;
}

.plugin-active {
    background-color: #f0f7ff;
    border-color: #1a73e8;
}

.plugin-active:hover {
    background-color: #e8f0fe;
}

.plugin-icon {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
}

h3 {
    margin: 0 0 5px 0;
    font-size: 16px;
}

p {
    margin: 0;
    font-size: 14px;
    color: #666;
}

.active-plugins {
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
    margin-bottom: 15px;
}

.active-plugins h3 {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
}

.active-plugins-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.active-plugin-item {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    padding: 4px 8px;
    border-radius: 16px;
    gap: 6px;
}

.active-plugin-icon {
    width: 20px;
    height: 20px;
    border-radius: 4px;
}

.active-plugin-name {
    font-size: 12px;
    color: #333;
}

.disable-button {
    background: none;
    border: none;
    padding: 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.disable-button svg {
    width: 16px;
    height: 16px;
    fill: #666;
}

.plugin-status {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 12px;
    color: #666;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 2px 6px;
    border-radius: 10px;
}

.plugin-active .plugin-status {
    color: #1a73e8;
    background-color: #e8f0fe;
}
</style> 