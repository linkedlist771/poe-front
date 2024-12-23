<template>
    <a-card class="max-w-md custom-card">
        <div class="flex items-start mb-2">
            <div class="w-10 h-10 bg-orange-400 rounded-lg flex items-center justify-center mr-3">
                <!-- <home-outlined class="text-white text-xl" /> -->
            </div>
            <div class="flex-grow">
                <div class="flex items-center mb-1">
                    <a-avatar :src="getAvatarForModel(modelName)" class="mr-2"></a-avatar>
                    <strong class="title"> {{ modelName }}</strong>


                    <!-- <span class="text-xl font-bold mb-0">22</span> -->
                    <!-- <h2 class="text-xl font-bold mb-0"></h2> -->
                </div>
                <div class="flex items-center text-sm text-gray-600">
                    <span>By</span>
                    <!-- <robot-outlined class="mx-1" /> -->
                    <a-typography-link>@{{ modelInformation.owned_by }}</a-typography-link>
                </div>
            </div>
        </div>
        <div class="text-gray-600 text-sm mb-3">14K followers</div>
        <div class="flex mb-4">
            <a-button class="mr-2 custom-button" shape="round">
                <info-circle-outlined />
                <span class="ml-1">Bot info</span>
            </a-button>
            <a-button class="mr-2 custom-icon-button" shape="circle">
                <share-alt-outlined />
            </a-button>
            <a-button class="custom-icon-button" shape="circle">
                <arrow-down-outlined />
            </a-button>
        </div>
        <a-typography-paragraph class="text-sm mb-4">
            <!-- Anthropic 最强大的模型。擅长复杂任务如编码、写作、分析和视觉处理。上下文窗口已被缩短以优化速度和成本。对于需要更长上下文的消息，请尝试
            Claude-3.5-Sonnet-200k。积分可能会发生变化。 -->
            {{ modelInformation.desc }}
        </a-typography-paragraph>
        <div class="flex items-center text-sm text-gray-600 mb-2">
            <a-typography-text strong class="mr-1"> {{ modelInformation.points }}积分</a-typography-text>
            <!-- <info-circle-outlined class="mr-1" /> -->
            <span>•每条信息 •</span>
            <a-typography-link class="ml-1">View details</a-typography-link>
        </div>
        <a-tag color="blue" class="custom-tag">OFFICIAL</a-tag>
    </a-card>
</template>

<script setup lang="ts">
import {
    HomeOutlined,
    RobotOutlined,
    InfoCircleOutlined,
    ShareAltOutlined,
    ArrowDownOutlined
} from '@ant-design/icons-vue';
import {
    Card,
    Button,
    Typography,
    Tag,
    Avatar
} from 'ant-design-vue';
import { computed } from 'vue';
import { getAvatarForModel, getModelInformation } from '../api/model_utils'
const modelInformation = computed(() => getModelInformation(props.modelName))

const props = defineProps<{
    modelName: string
}>();
</script>

<style scoped>
.title {
    font-size: large;
}

.custom-card {
    /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); */
    background-color: #f7f7f7;

}

.custom-card :deep(.ant-card-body) {
    padding: 16px;
}

.custom-button {
    height: 32px;
    padding: 0 12px;
    font-size: 14px;
}

.custom-icon-button {
    width: 32px;
    height: 32px;
    padding: 0;
    font-size: 14px;
}

.custom-tag {
    border: none;
    font-weight: 500;
    padding: 1px 8px;
}

.flex-grow {
    flex-direction: column;
}
</style>