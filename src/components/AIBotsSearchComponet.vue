<template>
    <transition name="fade">
        <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
            <div class="bot-search-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close-button" @click="closeModal">&times;</button>
                    </div>
                    <!-- 添加的公司筛选标签区域 -->
                    <div class="filter-container">
                        <div class="company-tags">
                            <span v-for="company in allCompanies" :key="company.value"
                                :class="{ 'tag': true, 'selected': selectedCompanies.includes(company.label) }"
                                @click="toggleCompanySelection(company.label)">
                                {{ company.label }}
                            </span>
                        </div>
                    </div>
                    <div class="search-container">
                        <input type="text" v-model="searchQuery" placeholder="搜索更多机器人">
                    </div>
                    <!-- <div class="bot-list">

                        <div v-for="[modelName, modelInfo] in Object.entries(filteredModels)" :key="modelName"
                            class="bot-item" @click="chatWithBot(modelName)">
                            <ModelAvatar :modelName="modelName" :showName="false"></ModelAvatar>
                            <div class="bot-info">
                                <h3>{{ modelName }}</h3>
                                <p>{{ modelInfo.desc }}</p>
                                <div class="bot-tags">
                                    <span v-if="!modelInfo.premium_model" class="tag official">免费</span>
                                    <span v-else class="tag subscriber">高级</span>
                                    <span class="tag points">积分: {{ modelInfo.points }}</span>
                                </div>

                            </div>
                        </div>
                    </div> -->

                    <div class="bot-list">
                        <ModelItem v-for="[modelName, modelInfo] in Object.entries(filteredModels)" :key="modelName"
                            :modelName="modelName" :modelInfo="modelInfo" @click="chatWithBot"></ModelItem>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import modelData from '../data/models.json';
import ModelAvatar from './ModelAvatar.vue';
import ModelItem from './ModelItem.vue'; // 导入新组件

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
    // 判断当前是否在 /chat 路由
    if (route.path === '/chat') {
        await router.replace({ path: '/chat', query })
        window.location.reload()
    } else {
        await router.push({ path: '/chat', query })
    }

    closeModal();
};

const searchQuery = ref('');

// 选中的公司列表，存储标签的label
const selectedCompanies = ref<Array<string>>([]);

// 更新：将所有公司列表修改为包含label和value的对象数组
const allCompanies = ref<Array<{ label: string, value: string }>>([
    { label: "openai", value: "openai" },
    { label: "anthropic", value: "anthropic" },
    { label: "google", value: "google" },
    { label: "alibaba", value: "alibaba" },
    { label: "mistralai", value: "mistralai" },
    { label: "stabilityai", value: "stabilityai" },
    { label: "文生图", value: "stabilityai" } // 新增的标签
]);

// 切换公司选中状态，基于label
const toggleCompanySelection = (companyLabel: string) => {
    if (selectedCompanies.value.includes(companyLabel)) {
        selectedCompanies.value = selectedCompanies.value.filter(c => c !== companyLabel);
    } else {
        selectedCompanies.value.push(companyLabel);
    }
};

// 计算属性：将选中的公司label映射到value
const effectiveSelectedCompanies = computed(() => {
    return selectedCompanies.value.map(label => {
        const company = allCompanies.value.find(c => c.label === label);
        return company ? company.value : label;
    });
});

const filteredModels = computed(() => {
    return Object.fromEntries(
        Object.entries(modelData).filter(([modelName, modelInfo]) => {
            const matchesQuery = !searchQuery.value || modelName.toLowerCase().includes(searchQuery.value.toLowerCase());
            const matchesCompany = effectiveSelectedCompanies.value.length === 0 || effectiveSelectedCompanies.value.includes(modelInfo.owned_by);
            return matchesQuery && matchesCompany;
        })
    );
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
</style>