<template>
    <transition name="fade">
        <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
            <div class="bot-search-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close-button" @click="closeModal">&times;</button>
                    </div>
                    <div class="filter-container">
                        <div class="company-tags">
                            <span v-for="tag in allTags" :key="tag.value"
                                :class="{ 'tag': true, 'selected': selectedTags.includes(tag.label) }"
                                @click="toggleTagSelection(tag.label)">
                                {{ tag.label }}
                            </span>
                        </div>
                    </div>
                    <div class="search-container">
                        <input type="text" v-model="searchQuery" placeholder="搜索更多机器人">
                    </div>
                    <div class="bot-list" @scroll="handleScroll">
                        <ModelItem v-for="[modelName, modelInfo] in Object.entries(filteredModels)" :key="modelName"
                            :modelName="modelName" :modelInfo="modelInfo" @click="chatWithBot"></ModelItem>
                        
                        <div v-if="isLoading" class="loading-indicator">
                            加载中...
                        </div>
                        
                        <div v-if="!hasMore && Object.keys(filteredModels).length > 0" class="no-more-data">
                            没有更多数据了
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import modelData from '../data/models.json';
import ModelItem from './ModelItem.vue';

import { useMainStore } from '../stores/main'
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
    isVisible: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['close']);

const router = useRouter();
const store = useMainStore();
const route = useRoute();

const chatWithBot = async (modelName: string) => {
    store.setModel(modelName);
    store.clearCurrentChatHistory();
    const query = {}
    if (route.path === '/chat') {
        await router.replace({ path: '/chat', query })
        window.location.reload()
    } else {
        await router.push({ path: '/chat', query })
    }

    closeModal();
};

const searchQuery = ref('');

const selectedTags = ref<Array<string>>([]);

const allTags = ref<Array<{ label: string, value: string }>>([
    { label: "openai", value: "openai" },
    { label: "anthropic", value: "anthropic" },
    { label: "google", value: "google" },
    { label: "alibaba", value: "alibaba" },
    { label: "mistralai", value: "mistralai" },
    { label: "stabilityai", value: "stabilityai" },
    { label: "文生图", value: "text2image" }
]);

const toggleTagSelection = (tagLabel: string) => {
    if (selectedTags.value.includes(tagLabel)) {
        selectedTags.value = selectedTags.value.filter(t => t !== tagLabel);
    } else {
        selectedTags.value.push(tagLabel);
    }
};

const effectiveSelectedTags = computed(() => {
    return selectedTags.value.map(label => {
        const tag = allTags.value.find(t => t.label === label);
        return tag ? tag.value : label;
    });
});

const pageSize = 100; // 每页显示的数量
const currentPage = ref(1);
const isLoading = ref(false);
const hasMore = ref(true);

const allFilteredModels = computed(() => {
    return Object.entries(modelData).filter(([modelName, modelInfo]) => {
        const matchesQuery = !searchQuery.value || modelName.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesTags = effectiveSelectedTags.value.length === 0 || effectiveSelectedTags.value.some(tag => {
            if (tag === 'text2image') {
                return modelInfo.text2image === true;
            }
            return modelInfo.owned_by.toLowerCase() === tag;
        });
        return matchesQuery && matchesTags;
    });
});

const filteredModels = computed(() => {
    const endIndex = currentPage.value * pageSize;
    return Object.fromEntries(allFilteredModels.value.slice(0, endIndex));
});

const loadMore = async () => {
    if (isLoading.value || !hasMore.value) return;
    
    isLoading.value = true;
    
    // 模拟异步加载
    await new Promise(resolve => setTimeout(resolve, 300));
    
    currentPage.value++;
    
    // 检查是否还有更多数据
    if (currentPage.value * pageSize >= allFilteredModels.value.length) {
        hasMore.value = false;
    }
    
    isLoading.value = false;
};

const handleScroll = (e: Event) => {
    const element = e.target as HTMLElement;
    const { scrollTop, scrollHeight, clientHeight } = element;
    
    // 当滚动到距离底部 50px 时加载更多
    if (scrollHeight - scrollTop - clientHeight < 50) {
        loadMore();
    }
};

const resetPagination = () => {
    currentPage.value = 1;
    hasMore.value = true;
};

watch([searchQuery, selectedTags], () => {
    resetPagination();
});

const closeModal = () => {
    emit('close');
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.bot-search-modal {
    background-color: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-content {
    padding: 20px;
}

.modal-header {
    text-align: right;
}

.close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
}

/* 新增的样式 */
.filter-container {
    margin-bottom: 10px;
}

.company-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.tag {
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
    background-color: #f0f0f0;
    cursor: pointer;
}

.tag.selected {
    background-color: #007BFF;
    color: white;
}

.search-container {
    margin-bottom: 20px;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
}

.bot-list {
    max-height: 60vh;
    overflow-y: auto;
    padding: 10px;
}

.bot-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
}

.bot-item:hover {
    background-color: #f0f0f0;
    cursor: pointer;
}

.bot-info {
    flex-grow: 1;
    margin-left: 15px;
}

.bot-info h3 {
    margin: 0;
    font-size: 16px;
}

.bot-tags {
    margin-top: 5px;
}

.tag {
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
    margin-right: 5px;
}

.official {
    background-color: #f0f0f0;
}

.subscriber {
    background-color: #e0e0e0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.loading-indicator {
    text-align: center;
    padding: 10px;
    color: #666;
}

.no-more-data {
    text-align: center;
    padding: 10px;
    color: #999;
    font-size: 14px;
}
</style>