<template>
    <div class="bot-item" @click="onClick">
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
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import ModelAvatar from './ModelAvatar.vue';

const props = defineProps({
    modelName: {
        type: String,
        required: true,
    },
    modelInfo: {
        type: Object as () => {
            desc: string;
            premium_model: boolean;
            points: number;
            owned_by: string;
        },
        required: true,
    },
});

const emit = defineEmits(['click']);

const onClick = () => {
    emit('click', props.modelName);
};
</script>

<style scoped>
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
</style>