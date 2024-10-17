<template>
    <div class="chat-container">
        <div class="chat-content">
            <div class="header">
                <div class="model-quick-view">
                    <!-- <img :src="botAvatar" :alt="selectModelValue" class="bot-avatar">
                    <span>{{ selectModelValue }}</span> -->
                    <ModelAvatar :modelName="selectModelValue" :showName="true"></ModelAvatar>




                </div>
                <div class="actions">

                    <button class="action-button" @click="clearState"><strong>New chat</strong></button>
                    <!-- <button class="action-button"><strong>Share</strong></button> -->
                </div>
            </div>

            <div class="chat-area" ref="messageContainerRef">
                <div class="model-info">
                    <ModelCard :modelName="selectModelValue"></ModelCard>
                </div>
                <div class="messages">
                    <a-layout-content>
                        <div>
                            <div class="message-item"
                                :class="{ 'user-message': item.role === 'user', 'assistant-message': item.role === 'assistant' }"
                                v-for="(item, index) in messageList" :key="index">
                                <div class="message-avatar" v-if="item.role === 'assistant'">
                                    <a-avatar :size="30" shape="circle" :src="roleImgMap[item.role]" :class="{
                                        'assistant-avatar-heartbeat':
                                            item.role === 'assistant' && index === messageList.length - 1 && isStreaming
                                    }"></a-avatar>
                                </div>
                                <div class="message-content">
                                    <template v-if="true">
                                        <MarkDownMessage :text="item.content" :index="index" :role="item.role"
                                            :files="item.files" v-if="!item.loading"></MarkDownMessage>
                                        <a-spin size="large" v-else />
                                    </template>
                                </div>
                            </div>
                        </div>
                    </a-layout-content>
                </div>
            </div>



            <div class="input-area">
                <button class="broom-button" @click="clearState">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                        fill="currentColor">
                        <path
                            d="M19.54 3.66c-.13-.49-.45-.9-.89-1.16-.44-.26-.95-.32-1.45-.19-.49.13-.9.45-1.16.89l-3.48 6.03L10.42 8a.738.738 0 0 0-1.02.27L8.28 10.2c-.1.17-.13.38-.08.57.05.19.18.36.35.46l.31.18c-2.21 2.1-6.06 3.64-6.1 3.66-.26.1-.45.35-.47.63-.03.28.11.55.35.7l2.01 1.25c.19.12.42.15.63.08.03-.01.48-.16 1.07-.42-.1.15-.18.24-.18.24-.15.16-.22.39-.2.61.03.22.16.42.35.54l4.99 3.1c.12.08.26.11.4.11.16 0 .32-.05.45-.15.11-.09 2.63-2.04 3.74-6.29l.31.18a.746.746 0 0 0 1.02-.27l1.12-1.93c.1-.17.13-.38.08-.57a.77.77 0 0 0-.35-.46l-2.21-1.27 3.48-6.03c.25-.45.32-.97.19-1.46Zm-7.91 16.56-3.84-2.39c.28-.49.59-1.2.65-2.07a.758.758 0 0 0-.38-.71.747.747 0 0 0-.8.04c-.74.52-1.65.91-2.13 1.09l-.49-.3c1.51-.71 3.96-2.04 5.56-3.7l4.33 2.5c-.69 3.03-2.2 4.84-2.9 5.54Zm4.68-6.26L9.96 10.3l.36-.63 4.15 2.39 2.2 1.27-.36.63Zm1.74-9.6-3.48 6.03-.7-.4 3.48-6.03c.11-.19.36-.26.55-.15a.405.405 0 0 1 .15.55ZM16.75 21.14a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM19 17.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM20.25 19.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                    </svg>
                </button>
                <SendMessageButton @sendMessage="sendMessage" @updateFileList="handleFileListUpdate"
                    :placeholder="'在这输入'" :disabled="isStreaming">
                </SendMessageButton>
            </div>

            <!-- Replace the existing stop button container with this -->
            <div v-if="isStreaming" class="stop-button-container">
                <button @click="stopReceiveMessage" class="stop-button">


                    <span class="stop-icon">


                    </span>
                    停止
                </button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, nextTick, onMounted } from 'vue'
import { message, Upload } from 'ant-design-vue'
import { throttle } from 'lodash-es'
import SendMessageButton from './SendMessageButton.vue';
import { useMainStore } from '../stores/main'
import { storeToRefs } from 'pinia'
import MarkDownMessage from './message/MarkdownMessage.vue'
import {
    getQueryParam,
    chat,
} from '../api/chat'

import userImg from '@/assets/user.png'
import aiImg from '@/assets/ai.png'
import { useRouter } from 'vue-router';
import ModelAvatar from './ModelAvatar.vue';
import ModelCard from './ModelCard.vue';

import type { UploadChangeParam } from 'ant-design-vue';
import { getAvatarForModel } from '../api/model_utils'



const router = useRouter();

const conversation_id = ref('')
// const uploadFileRes = ref([])
const attachments = ref([])
const isSend: Ref<boolean> = ref(false)
const inputText = ref<string>('')
const isReadyToSend = ref<boolean>(false); // 新增一个状态变量，标记是否准备发送



const fileList = ref([])
const uploadFileRes = ref<UploadChangeParam['fileList']>([]);


const abortController = ref<AbortController>()
const isStreaming = ref(false)
const modelDisabled = ref(false)
const messageContainerRef = ref<Element | null>(null)
const messageContainerHeight = ref(0)


const store = useMainStore()
const { api_key, client_idx, client_type, inputMessage, model } = storeToRefs(store)
const selectModelValue = model.value //getQueryParam('model') ?? ''
const clientIdx = client_idx.value//getQueryParam('client_idx') ?? ''
const clientType = client_type.value//getQueryParam('client_type') ?? ''
const apiKey = getQueryParam('api_key') || (localStorage.getItem('SJ_API_KEY') as string) //api_key.value//getQueryParam('api_key') || (localStorage.getItem('SJ_API_KEY') as string)

console.log('selectModelValue', selectModelValue)
console.log('clientIdx', clientIdx)
console.log('clientType', clientType)
console.log('apiKey', apiKey)

const roleImgMap: any = {
    assistant: getAvatarForModel(selectModelValue),
    user: userImg
}

const messageList: Ref<Message[]> = ref([
    // { role: 'assistant', content: `我是${model.value}， 有什么能帮助你的吗？`, timestamp: '10:00 AM' },

])
const isImageFile = (file: File): boolean => file.type.startsWith('image/');

const handleFileListUpdate = (files: UploadChangeParam['fileList']) => {
    uploadFileRes.value = files;
};

function stopReceiveMessage() {
    if (!abortController.value) {
        return
    }

    abortController.value.abort()
    isStreaming.value = false
    isSend.value = false
    // Update the loading state of the last message
    if (messageList.value.length > 0) {
        const lastMessage = messageList.value[messageList.value.length - 1]
        if (lastMessage.role === 'assistant') {
            lastMessage.loading = false
        }
    }

}

const clearState = () => {
    attachments.value = []
    fileList.value = []
    messageList.value = []
    conversation_id.value = ''
    inputText.value = ''
    modelDisabled.value = false
    uploadFileRes.value = []
    clearTimeout(timeoutId)
    // isNetworkEnabled.value = false // 添加这一行
    // isArtifactsEnabled.value = false
}

const scrollToBottom = throttle(function (force?: boolean) {
    nextTick(() => {
        if (messageContainerRef.value) {
            const containerHeight = messageContainerRef.value?.clientHeight

            if (force || messageContainerHeight.value !== containerHeight) {
                messageContainerHeight.value = containerHeight
                messageContainerRef.value.scrollIntoView({ behavior: 'smooth', block: 'end' })
                // 等待一小段时间，确保第一次滚动完成
                // setTimeout(() => {
                //     // 然后再额外滚动指定的距离
                //     window.scrollBy({
                //         top: 100,
                //         left: 0,
                //         behavior: 'smooth'
                //     });
                // }, 100); // 100ms 延迟，可以根据需要调整

                // 等待一小段时间，确保第一次滚动完成
                // setTimeout(() => {
                //     // 然后再额外滚动指定的距离
                //     console.log('New scroll position:');

                //     window.scrollBy({
                //         top: 200,  // 这里的100px是额外滚动的距离，可以根据您的输入栏高度调整
                //         left: 0,
                //         behavior: 'smooth'
                //     });
                // }, 100); // 100ms 延迟，可以根据需要调整
            }
        }
    })
}, 0)

let timeoutId: any = null;

// const addFiles 

const sendMessage = async (messageText: string) => {
    isSend.value = !isSend.value
    if (!isSend.value) {
        stopReceiveMessage()
        return
    }

    // 设置超时定时器
    timeoutId = setTimeout(() => {
        stopReceiveMessage()
        message.error('链接超时无响应，请刷新页面重新开始对话或更换账号。')
    }, 60 * 1000) // 1分钟后中止请求

    // const scrollTimeInterval = setInterval(() => {
    //     scrollToBottom(true)
    // }, 1000)

    // const messageText = inputText.value
    inputText.value = ''

    // scrollToBottom(true)
    // scrollToBottom(true)


    const payload = {
        client_idx: clientIdx,
        client_type: clientType,
        attachments: attachments.value,
        files: uploadFileRes.value,
        conversation_id: conversation_id.value,
        need_web_search: false, // 添加这一行
        need_artifacts: false
    }

    let resultText = ''
    isStreaming.value = true // 开始 streaming
    abortController.value = new AbortController()
    const chatOptions = {
        api_key: apiKey,
        message: messageText,
        model: selectModelValue,
        payload,
        controller: abortController.value,
        onProgress: (content: string, options: { done: boolean; id?: string }) => {
            modelDisabled.value = true
            let stringText = content
            scrollToBottom()
            resultText += stringText
            if (resultText !== '') {
                clearTimeout(timeoutId)
                // clearInterval(scrollTimeInterval)
            }
            const current = messageList.value[messageList.value.length - 1]
            current.content = resultText
            current.loading = false
            if (options.done) {
                isStreaming.value = false // 结束 streaming
                conversation_id.value = options?.id ?? ''
                scrollToBottom()
                isSend.value = false
                // clearInterval(scrollTimeInterval)

                uploadFileRes.value = []
                attachments.value = []
                // fetchConversation(clientIdx, clientType, apiKey).then((res: any) => {
                //     if (res) {
                //         list.value = res
                //     }
                // })
            }
        },
        onError: (err: any) => {
            isStreaming.value = false // 结束 streaming
            clearTimeout(timeoutId)
            // clearInterval(scrollTimeInterval)

            stopReceiveMessage()
            const index = messageList.value.length - 1
            messageList.value.splice(index, 1)
            isSend.value = false
            modelDisabled.value = false
            clearState()
            message.error(err || '链接超时，请刷新页面重新开始对话或更换账号。')
        }
    }

    const userMessage: Message = {
        role: 'user',
        content: messageText,
        loading: false,
        files: uploadFileRes.value.map(file => ({
            uid: file.uid,
            name: file.name,
            status: 'done',
            url: file.url,
            thumbUrl: file.thumbUrl,
        }))
    };
    console.log(userMessage)
    messageList.value.push(userMessage);
    messageList.value.push({
        role: 'assistant',
        content: resultText,
        loading: true
    });

    // messageList.value.push(
    //     ...[
    //         {
    //             role: 'user',
    //             content: messageText,
    //             loading: false
    //         },
    //         {
    //             role: 'assistant',
    //             content: resultText,
    //             loading: true
    //         }
    //     ]
    // )
    scrollToBottom()
    chat(chatOptions)
}


const loadAndResetHistories = async () => {
    // const res = await fetchConversation(clientIdx, clientType, apiKey)
    // if (res) {
    //     list.value = res
    // }
    const { currentChatHistory } = storeToRefs(store)
    if (currentChatHistory.value) {

        messageList.value = currentChatHistory.value?.messages
        conversation_id.value = currentChatHistory.value?.conversation_id


    }
    store.clearCurrentChatHistory()
    // 滚动到最下面
    scrollToBottom(true)

}



type Message = {
    role: string
    content: string
    loading?: boolean
    file?: { type: string; url: string; name: string; loading: boolean }
    timestamp?: string
    files?: any[] // Add this line

}


onMounted(() => {
    if (store.inputMessage) {
        sendMessage(store.inputMessage);
        // 发送完消息后，清空 inputMessage，防止重复发送
        store.setInputMessage('');
    }
    loadAndResetHistories()
    const temptApiKey = getQueryParam('api_key') || (localStorage.getItem('SJ_API_KEY') as string)


    if (!temptApiKey || !client_idx.value || client_idx.value == 0 || !selectModelValue) {

        router.push('/status')
    }

});

</script>


<style scoped>
.ant-upload-list {
    margin-top: 10px;
}

.ant-upload-list-item {
    margin-right: 8px;
}

.chat-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    overflow-y: auto;
    position: relative;
}

.chat-content {
    flex-grow: 1;
    overflow-y: auto;
    padding-bottom: 80px;
}

.header {
    display: flex;
    position: fixed;
    width: 100%;
    z-index: 100;
    justify-content: space-between;
    align-items: center;
    background-color: #f7f7f7;
    padding: 10px;
}

.actions {
    display: flex;
    padding-right: 20rem;
    gap: 10px;
}

.action-button {
    padding: 5px 10px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.chat-area {
    padding-top: 60px;
    padding-bottom: 80px;
    /* Add this line to make room for the input area */

    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    overflow-y: auto;
}

.model-info {
    background-color: #f7f7f7;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
}

.model-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.model-icon {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 8px;
    background-color: #f4a261;
}

.model-title h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
}

.model-creator {
    display: flex;
    align-items: center;
    margin: 0;
    font-size: 12px;
    color: #666;
}

.creator-icon {
    width: 14px;
    height: 14px;
    margin-right: 4px;
}

.action-buttons {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
}

.info-button,
.share-button {
    padding: 6px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    background-color: #fff;
    font-size: 12px;
    cursor: pointer;
}

.model-description {
    font-size: 12px;
    line-height: 1.5;
    color: #333;
    margin-bottom: 12px;
    text-align: left;
}

.compute-info {
    display: flex;
    align-items: center;
    font-size: 12px;
}

.compute-points {
    display: flex;
    align-items: center;
    margin-right: 8px;
}

.view-details {
    color: #1a73e8;
    text-decoration: none;
}

.messages {
    margin-bottom: 30px;
    padding-bottom: 50px;
}

/* 样式用于区分用户消息和助手消息 */
.message-item {
    display: flex;
    justify-content: flex-end;
    /* 所有消息项右对齐 */

    margin-bottom: 15px;
}

/* 助手消息内容样式 */
.assistant-message .message-content {
    max-width: 100%;
    /* 拉满宽度 */
    /* background-color: #f1f1f1; */
    text-align: left;
    /* 内容左对齐 */
    padding: 10px 15px;
    border-radius: 15px;
    word-wrap: break-word;
}

/* 用户消息内容样式 */
.user-message .message-content {
    max-width: 90%;
    display: inline-block;
    /* 允许消息框根据内容自适应宽度 */

    /* 设置用户消息的最大宽度，可根据需要调整 */
    /* background-color: #daf1ff; */
    /* text-align: right; */
    /* 内容右对齐 */
    padding: 10px 15px;
    border-radius: 15px;
    word-wrap: break-word;
}

/* 隐藏用户头像 */
.user-message .message-avatar {
    display: none;
}

/* 设置消息内容的样式 */
.message-content {
    max-width: 80%;
    padding: 10px 15px;
    border-radius: 15px;
    position: relative;
    word-wrap: break-word;
}

/* 用户消息样式 */
.user-message .message-content {
    /* background-color: #daf1ff; */
    /* text-align: right; */
}

/* 助手消息样式 */
.assistant-message .message-content {
    /* background-color: #f1f1f1; */
    text-align: left;
}

/* 确保消息框最大宽度不超过页面宽度 */
.chat-area {
    padding-top: 60px;
    padding-bottom: 80px;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    overflow-y: auto;
}

.message-avatar {
    margin-right: 10px;
}

.message-content {
    flex-grow: 1;
}

.file-container {
    position: relative;
    display: inline-block;
}

.file-delete {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #f0f0f0;
    border-radius: 50%;
    padding: 2px;
    cursor: pointer;
}

.file-info {
    display: flex;
    align-items: center;
}

.file-name {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.input-area {
    position: absolute;
    /* Change from fixed to absolute */
    bottom: 0rem;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #ffffff;
    padding: 15px;
    /* box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    /* Add space between the button and the input */

}

.broom-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background-color 0.3s ease;
}

.broom-button:hover {
    background-color: #f0f0f0;
}

.broom-button svg {
    width: 24px;
    height: 24px;
    color: #666;
}

/* .assistant-avatar-heartbeat {
    animation: avatar-heartbeat 1.4s ease-in-out infinite;
}

@keyframes avatar-heartbeat {

    0%,
    100% {
        transform: scale(1);
    }

    15% {
        transform: scale(0.6);
    }

    30% {
        transform: scale(0.9);
    }

    45% {
        transform: scale(0.6);
    }

    60% {
        transform: scale(0.95);
    }
} */

.assistant-avatar-heartbeat {
    animation: avatar-heartbeat 1.4s ease-in-out infinite, avatar-rotate 4s linear infinite;
}

@keyframes avatar-heartbeat {

    0%,
    100% {
        transform: scale(1) rotate(0deg);
    }

    15% {
        transform: scale(0.6) rotate(90deg);
    }

    30% {
        transform: scale(0.9) rotate(180deg);
    }

    45% {
        transform: scale(0.6) rotate(270deg);
    }

    60% {
        transform: scale(0.95) rotate(360deg);
    }
}

@keyframes avatar-rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}


.stop-button-container {
    position: absolute;
    left: 50%;
    left: 50%;
    bottom: 100px;
    /* Adjust this value as needed */
    transform: translateX(-50%);
    z-index: 100;
}

.stop-button {
    padding: 8px 16px;
    background-color: white;
    color: black;
    border: none;
    border: 1px solid #e0e0e0;

    border-radius: 20px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
}

.stop-button:hover {
    background-color: #f7f7f7;
}


@media (max-width: 768px) {
    .stop-button-container {
        bottom: 70px;
        /* Adjust for mobile screens */
    }

    .actions {
        padding-right: inherit;
    }

    .input-area {
        bottom: 2.3rem;
        padding: 10px;
    }

    .broom-button {
        padding: 6px;
    }

    .broom-button svg {
        width: 20px;
        height: 20px;
    }


    .stop-button {
        padding: 6px 12px;
        font-size: 12px;
    }

    .chat-area {
        padding-top: 80px;
    }

    .fixed-toggle {
        bottom: 13rem;
    }

    .model-info {
        padding: 10px;
    }

    .model-icon {
        width: 30px;
        height: 30px;
    }

    .model-title h2 {
        font-size: 14px;
    }

    .model-creator,
    .model-description,
    .compute-info {
        font-size: 10px;
    }

    .action-buttons {
        flex-wrap: wrap;
    }

    .info-button,
    .share-button {
        font-size: 10px;
        padding: 4px 8px;
    }
}
</style>