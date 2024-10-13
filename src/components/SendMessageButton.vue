<template>
    <div class="input-container" @paste="handlePaste" @drop.prevent="handleDrop" @dragover.prevent>

        <textarea v-model="inputText" :placeholder="placeholder" class="chat-input" @keyup.enter.exact="emitSendMessage"
            @keyup.enter.shift.exact.prevent="newline" ref="textareaRef"></textarea>

        <div class="file-preview" v-if="fileList.length > 0">
            <div v-for="(item, index) in fileList" :key="index" class="file-item">
                <div class="delete-icon" @click="deleteFile(index)">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="delete-icon-svg">
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                </div>
                <div v-if="item.type && item.type.startsWith('image')">
                    <img :src="item.url || URL.createObjectURL(item.originFileObj)" alt="Preview"
                        class="image-preview" />
                </div>
                <div v-else class="file-icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="file-icon-svg">
                        <path
                            d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                    </svg>
                    <span class="file-name">{{ item.name }}</span>
                </div>
            </div>
        </div>
        <div class="button-group">
            <button class="addFiles" aria-label="Add attachment">
                <a-upload :before-upload="beforeUpload" :accept="accept" v-model:file-list="fileList" :max-count="5"
                    :customRequest="customRequest" @change="handleChange" :show-upload-list="false">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="add-icon">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8-10C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 4a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H7a1 1 0 1 1 0-2h4V7a1 1 0 0 1 1-1Z">
                        </path>
                    </svg>
                </a-upload>
            </button>
            <button class="mic-button" @click="handleToggleMic" aria-label="Toggle microphone">
                <svg viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" class="mic-icon">
                    <path clip-rule="evenodd"
                        d="M4.235 1.803C4.848.823 6.013 0 8 0c1.986 0 3.152.824 3.765 1.803a3.826 3.826 0 0 1 .568 1.836V3.664s0 .003-1 .003h1v10.666h-1 1v.028a1.823 1.823 0 0 1-.01.176 3.827 3.827 0 0 1-.558 1.66C11.152 17.177 9.986 18 8 18c-1.987 0-3.152-.824-3.765-1.803a3.828 3.828 0 0 1-.568-1.836V14.336s0-.003 1-.003h-1V3.667h1-1v-.028a2.004 2.004 0 0 1 .01-.176 3.827 3.827 0 0 1 .558-1.66Zm1.432 1.874.002-.036a1.828 1.828 0 0 1 .262-.778C6.152 2.51 6.653 2 8 2s1.848.51 2.069.863a1.83 1.83 0 0 1 .264.814v10.646l-.002.036a1.83 1.83 0 0 1-.262.778c-.221.353-.722.863-2.07.863-1.346 0-1.847-.51-2.068-.863a1.828 1.828 0 0 1-.264-.814V3.677Zm-4.334 4.99a1 1 0 0 1 1 1v4.666l.001.03a5.657 5.657 0 0 0 .087.725c.09.49.27 1.13.62 1.76a4.464 4.464 0 0 0 1.62 1.69c.76.457 1.827.795 3.339.795s2.579-.338 3.34-.795a4.464 4.464 0 0 0 1.62-1.69c.349-.63.528-1.27.62-1.76a5.642 5.642 0 0 0 .086-.724V9.667a1 1 0 1 1 2 0v4.666h-1 1v.035a3.958 3.958 0 0 1-.016.302 7.653 7.653 0 0 1-.104.783 7.85 7.85 0 0 1-.839 2.366 6.464 6.464 0 0 1-2.338 2.434c-.902.541-2.013.914-3.37 1.037v3.377h4.334a1 1 0 0 1 0 2H2.667a1 1 0 1 1 0-2H7v-3.378c-1.356-.122-2.467-.495-3.369-1.036a6.463 6.463 0 0 1-2.339-2.434 7.852 7.852 0 0 1-.838-2.366 7.66 7.66 0 0 1-.118-1.015 3.637 3.637 0 0 1-.002-.07v-.032s0-.003 1-.003h-1V9.667a1 1 0 0 1 1-1Z">
                    </path>
                </svg>
            </button>
            <button class="send-button" @click="emitSendMessage" :disabled="disabled || !inputText.trim()"
                aria-label="Send message">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="send-icon">
                    <path
                        d="M4 13h14.09l-6.79 6.79a.996.996 0 1 0 1.41 1.41l8.5-8.5c.06-.06.09-.13.13-.2.03-.04.06-.08.08-.13a.91.91 0 0 0 .08-.37c0-.03-.01-.05-.01-.07-.01-.1-.02-.21-.06-.31a.955.955 0 0 0-.22-.33L12.72 2.8c-.2-.2-.45-.29-.71-.29-.26 0-.51.1-.71.29a.996.996 0 0 0 0 1.41L18.08 11H4c-.55 0-1 .45-1 1s.45 1 1 1Z">
                    </path>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'


const accept = 'image/*,.pdf,.doc,.docx,.csv,.txt,.html,.htm'
const fileList = ref<UploadChangeParam['fileList']>([]);
const URL = window.URL || window.webkitURL;


defineProps<{
    placeholder?: string
    files?: UploadChangeParam['fileList']
    disabled: boolean


}>();

const emit = defineEmits<{
    (e: 'sendMessage', message: string): void
    (e: 'addFiles'): void
    (e: 'toggleMic'): void
    (e: 'updateFileList', files: UploadChangeParam['fileList']): void // Add this line

}>();

watch(fileList, (newFileList) => {
    emit('updateFileList', newFileList);
}, { deep: true });

const handlePaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (items) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf('image') !== -1) {
                const blob = item.getAsFile();
                if (blob) {
                    addFile(blob, URL.createObjectURL(blob));
                }
            }
        }
    }
};
const handleToggleMic = () => {
    message.warning('麦克风功能暂未开放');
};

const handleDrop = (event: DragEvent) => {
    const files = event.dataTransfer?.files;
    if (files) {
        for (let i = 0; i < files.length; i++) {
            addFile(files[i]);
        }
    }
}; // 添加拖拽处理函数

const addFile = (file: File, previewUrl?: string) => {
    if (fileList.value.length >= 5) {
        message.error('最多只能上传5个文件');
        return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        message.error('文件大小不能超过10MB');
        return;
    }

    fileList.value.push({
        uid: Date.now().toString(),
        name: file.name,
        status: 'done',
        originFileObj: file,
        url: previewUrl, // Add this line to include the preview URL
    });
};
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) {
        message.error('文件大小不能超过10MB')
        return false
    }
}

const handleChange = (info: UploadChangeParam) => {
    const { file, fileList: newFileList } = info;
    if (file.status === 'done') {
        message.success(`${file.name} 上传成功`);
    } else if (file.status === 'error') {
        message.error(`${file.name} file upload failed.`);
    }
    // Remove the URL from the file object
    const updatedFileList = newFileList.map(file => {
        const { url, ...rest } = file;
        return rest;
    });
    fileList.value = updatedFileList;
    emit('updateFileList', updatedFileList); // Add this line
};

const deleteFile = (index: number) => {
    fileList.value.splice(index, 1);
    emit('updateFileList', fileList.value); // Add this line
};


const customRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};



const inputText = ref('');
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const emitSendMessage = () => {
    if (inputText.value.trim()) {
        // 清空fileList
        fileList.value = [];
        emit('sendMessage', inputText.value);
        inputText.value = '';
        nextTick(() => {
            if (textareaRef.value) {
                textareaRef.value.style.height = 'auto';
                adjustTextareaHeight();
            }
        });
    }
};

const newline = () => {
    inputText.value += '\n';
};

const adjustTextareaHeight = () => {
    if (textareaRef.value) {
        textareaRef.value.style.height = 'auto';
        const newHeight = Math.min(Math.max(textareaRef.value.scrollHeight, 24), 150);
        textareaRef.value.style.height = `${newHeight}px`;
    }
};

onMounted(() => {
    if (textareaRef.value) {
        textareaRef.value.addEventListener('input', adjustTextareaHeight);
    }
});
</script>

<style scoped>
.input-container {
    display: flex;
    align-items: flex-end;
    background-color: white;
    border-radius: 25px;
    padding: 5px;
    max-width: 100vw;
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    box-shadow: 0 0px 2px black;
}

.chat-input {
    flex-grow: 1;
    border: none;
    width: calc(100% - 120px);
    background-color: transparent;
    padding: 10px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
    resize: none;
    overflow-y: auto;
    height: 36px;
    min-height: 24px;
    max-height: 150px;
    line-height: 1.5;
}

.file-name {
    font-size: 12px;
}

.input-container:focus-within {
    background-color: #f8f8f8;
    box-shadow: 0 0 0 2px purple;
}

.button-group {
    display: flex;
    align-items: center;
}

.addFiles,
.mic-button,
.send-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    margin: 0 2px;
    transition: all 0.3s ease;
}

.addFiles:hover,
.mic-button:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
}

.send-button {
    background-color: #dcf8c6;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.send-button::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid #dcf8c6;
    border-radius: 50%;
}

.send-button:hover {
    background-color: #c5e9b4;
}

.send-button:hover::after {
    border-color: #c5e9b4;
}

.add-icon,
.mic-icon,
.send-icon {
    width: 24px;
    height: 24px;
    fill: #666;
    transition: fill 0.3s ease;
}

.addFiles:hover .add-icon,
.mic-button:hover .mic-icon,
.send-button:hover .send-icon {
    fill: #333;
}

/* 新增的css */

.addFiles:disabled,
.mic-button:disabled,
.send-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

.addFiles:disabled .add-icon,
.mic-button:disabled .mic-icon,
.send-button:disabled .send-icon {
    fill: #999;
}

.send-button:disabled {
    background-color: #e0e0e0;
}

.send-button:disabled::after {
    border-color: #e0e0e0;
}


.file-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
    max-height: 100px;
    overflow-y: auto;
}

.file-item {
    position: relative;
    width: 100px;
    height: 100px;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
}

.delete-icon {
    position: absolute;
    top: 2px;
    right: 2px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    padding: 2px;
    cursor: pointer;
    z-index: 1;
}

.delete-icon-svg {
    width: 18px;
    height: 18px;
}

.image-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.file-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>