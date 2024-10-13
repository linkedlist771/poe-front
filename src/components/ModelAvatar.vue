<template>
    <div class="model-avatar">
        <a-avatar :src="avatarSrc" :alt="modelName"></a-avatar>
        <a-typography-text v-if="showName" strong>{{ modelName }}</a-typography-text>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getAvatarForModel } from '../api/model_utils'

const avatarSrc = computed(() => getAvatarForModel(props.modelName))

const props = defineProps({
    modelName: {
        type: String,
        required: true
    },
    showName: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped>
.model-avatar {
    display: inline-flex;
    flex-direction: row;
    gap: 0.4rem;
    align-items: center;
}

.model-avatar :deep(.ant-avatar) {
    width: 50px;
    height: 50px;
}

.model-avatar :deep(.ant-typography) {
    margin-top: 0px;
    font-size: 14px;
}
</style>
