<template>
  <div class="conversation-item" @mouseover="handleMouseOver($event)" @mouseleave="showButtons = false">
    <!-- 文件预览部分 -->

    <template v-if="files && files.length > 0">
      <div class="file-container" v-for="file in files" :key="file.uid">
        <!-- 图片预览 -->
        <div v-if="file.url && file.url.match(/\.(jpg|jpeg|png|gif|webp)$/i)">
          <a-image :width="100" class="object-cover" :src="file.url" />
        </div>
        <!-- 其他文件类型预览 -->
        <div class="file-info" v-else>
          <font-awesome-icon :icon="getFileIcon(file)" class="mr-10px" :style="{ width: '20px', height: '20px' }" />
          <a 
            :href="file.url" 
            target="_blank" 
            class="file-name hover:text-blue-600 hover:underline"
            :download="file.name"
          >
            {{ file.name }}
          </a>
          <font-awesome-icon 
            icon="download" 
            class="ml-10px text-gray-500 hover:text-gray-700" 
          />
        </div>
      </div>
    </template>

    <div class="content rounded-2xl" :class="[{ typing: loading }, roleClass]" @click="handleClick($event)"
      v-html="htmlStr"></div>



    <div class="action-buttons" :style="{
      top: buttonPosition.top + 'px',
      left: buttonPosition.left + 'px',
      padding: '4px 8px', // Add padding
      display: 'flex',
      gap: '6px' // Add gap between buttons
    }">
      <button @click="buttonCopyContent" class="action-button" style="border: none; background: none; padding: 0">
        <svg v-if="!isCheckmark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          fill="none">
          <!-- Original copy icon path -->
          <rect width="24" height="24" />
          <path fill="#333333" fill-rule="evenodd"
            d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z"
            clip-rule="evenodd"></path>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" />
          <path fill="#333333" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </button>
      <!-- <button v-if="props.role === 'assistant'" @click="renderContent" :disabled="!hasValidVueCode"
        class="action-button" style="border: none; background: none; padding: 0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M17 8l3-3"></path>
          <path d="M21 12h2"></path>
          <path d="M17 16l3 3"></path>
        </svg>
      </button> -->
    </div>

    <!-- 添加预览模态框 -->
    <div v-if="showPreview" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-4 w-4/5 h-4/5 relative">
        <button 
          @click="showPreview = false"
          class="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          关闭
        </button>
        
        <div class="h-full overflow-auto">
          <!-- 文本预览 -->
          <pre v-if="previewType === 'text'" class="whitespace-pre-wrap">
            {{ previewContent }}
          </pre>
          
          <!-- PDF预览 -->
          <iframe
            v-if="previewType === 'pdf'"
            :src="previewContent"
            class="w-full h-full"
            type="application/pdf"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css';
import { faFile, faFilePdf, faFileWord, faFileExcel, faFilePowerpoint, faFileArchive } from '@fortawesome/free-solid-svg-icons'

import { copyToClipboard } from 'quasar'
import MermaidPlugin from '../../plugins/mermaid'
import LatexPlugin from '../../plugins/latex'
import SvgPlugin from '../../plugins/svg'
import { message } from 'ant-design-vue'
// import katex from 'katex'
import 'katex/dist/katex.min.css'
import texmath from 'markdown-it-texmath'
import katex from '@neilsustc/markdown-it-katex'

import mk from 'markdown-it-katex'
import math from 'markdown-it-math'



const showButtons = ref(false)
function handleMouseOver(event) {
  showButtons.value = true
  updateButtonPosition(event)
}
const buttonPosition = ref({ top: 0, left: 0 })
const isCheckmark = ref(false)
const roleClass = computed(() => {
  switch (props.role) {
    case 'assistant':
      return 'assistant-content'
    case 'user':
      return 'user-content'
    case 'system':
      return 'system-content'
    default:
      return ''
  }
})
const getFileIcon = (file: File) => {
  const extension = file.name.split('.').pop().toLowerCase();
  switch (extension) {
    case 'pdf':
      return faFilePdf;
    case 'doc':
    case 'docx':
      return faFileWord;
    case 'xls':
    case 'xlsx':
      return faFileExcel;
    case 'ppt':
    case 'pptx':
      return faFilePowerpoint;
    case 'zip':
    case 'rar':
      return faFileArchive;
    default:
      return faFile;
  }
};
const props = withDefaults(
  defineProps<{
    text: string
    loading?: boolean
    index: number
    role: string
    files?: Array<any>

  }>(),
  {
    loading: false
  }
)

let md: MarkdownIt
md = new MarkdownIt({
  html: true,
  breaks: true,
  highlight: function (str, lang) {
    let highlightedText = ''
    if (lang && hljs.getLanguage(lang)) {
      highlightedText = hljs.highlight(str, {
        language: lang,
        ignoreIllegals: true
      }).value
    } else if (!lang && str) {
      const detection = hljs.highlightAuto(str)
      lang = detection.language || lang
      highlightedText = detection.value
    }

    const copyIcon =
      '<i class="q-icon copy-code notranslate material-icons" aria-hidden="true" role="presentation">copy</i>'

    if (highlightedText) {
      try {
        return (
          `<pre class="hljs language-${lang}">${copyIcon}` +
          `<code>${highlightedText}</code>` +
          '</pre>'
        )
      } catch (__) { }
    }

    return (
      `<pre class="hljs hljs_code ">${copyIcon}<code>` + md.utils.escapeHtml(str) + '</code></pre>'
    )
  },
  render: {
    link(tokens, idx) {
      const token = tokens[idx]
      const href = token.attrGet('href')
      const fileExt = href.split('.').pop().toLowerCase()
      
      // 如果是可预览的文件类型
      if (['txt', 'md', 'json', 'pdf'].includes(fileExt)) {
        return `<a href="javascript:void(0)" 
          class="text-blue-500 hover:text-blue-700 underline" 
          @click="handleFilePreview('${href}')">${token.content}</a>`
      }
      
      // 其他链接保持原有处理方式
      return false // 使用默认渲染
    }
  }
})
// 在使用 katex 插件之前先禁用默认的 $ 处理
// 直接使用 katex 插件即可
md.use(katex, {
  throwOnError: false,
  errorColor: '#cc0000',
  strict: false,
  trust: true
}).use(MermaidPlugin).use(SvgPlugin)

function convertImageReferences(text: string): string {
  // 构建图像ID到URL的映射
  const definitionPattern = /^\[([^\]]+)\]:\s*(.*)$/gm;
  const definitions: { [key: string]: string } = {};
  let definitionMatch: RegExpExecArray | null;

  while ((definitionMatch = definitionPattern.exec(text)) !== null) {
    const imageId = definitionMatch[1];
    const url = definitionMatch[2];
    definitions[imageId] = url;
  }

  // 定义替换函数
  const pattern = /!\[([^\]]*)\]\[([^\]]+)\]/g;
  let replacementsMade = false;

  const newText = text.replace(pattern, (match, altText, imageId) => {
    const url = definitions[imageId] || '';
    replacementsMade = true;
    return `![${altText}](${url})`;
  });

  // 如果没有发生替换，返回原始文本
  if (replacementsMade) {
    // 移除所有图像定义的行及其前后的空行
    return newText.replace(/^\s*\[([^\]]+)\]:\s*(.*)\s*$/gm, '').trim();
  }
  else {
    return newText;
  }
}

function normalizeLatex(text: string): string {
  // 处理 inline math \( ... \)
  text = text.replace(/\\\(\s*(.*?)\s*\\\)/g, (match, content) => {
    // 只去掉开头和结尾的空格
    const trimmedContent = content.trim();
    return `$${trimmedContent}$`;
  });
  
  // 处理 display math \[ ... \]
  text = text.replace(/\\\[\s*(.*?)\s*\\\]/g, (match, content) => {
    // 只去掉开头和结尾的空格
    const trimmedContent = content.trim();
    return `$$${trimmedContent}$$`;
  });
  
  return text;
}



const htmlStr = computed(() => {
  let computedStr = props.text;
  
  // 如果是用户消息，直接返回文本内容，不进行markdown渲染
  if (props.role === 'user') {
    return computedStr;
  }
  
  // 对于其他角色（assistant, system），继续进行markdown渲染
  computedStr = convertImageReferences(computedStr);
  computedStr = normalizeLatex(computedStr);
  return str2html(computedStr || '');
})



function str2html(str: string, model: 'render' | 'renderInline' = 'render') {
  if (model in md && typeof md[model] === 'function') {
    return md[model](str)
  }

  return str
}

function updateButtonPosition(event) {
  const rect = event.target.getBoundingClientRect()
  buttonPosition.value = {
    top: rect.bottom + window.scrollY,
    left: rect.left + window.scrollX
  }
}

async function buttonCopyContent() {
  try {
    await copyToClipboard(props.text)
    isCheckmark.value = true
    setTimeout(() => {
      isCheckmark.value = false
    }, 1500)
    message.success('复制成功')
  } catch (err) {
    // Handle error
  }
}


async function handleClick(event: MouseEvent) {
  if (!event.target) {
    return
  }

  const target = event.target as HTMLElement

  if (target.className.includes('copy-code')) {
    if (target.nextSibling?.textContent) {
      const isCoppied = await copyContent(target.nextSibling?.textContent)
      message.success(isCoppied ? '复制成功' : '复制失败')
      if (isCoppied) {
        const innerText = target.innerText
        target.innerText = 'done'
        setTimeout(() => {
          target.innerText = innerText
        }, 1000)
      }
    }
  }
}

async function copyContent(str: string): Promise<boolean> {
  try {
    await copyToClipboard(str)
    return true
  } catch (err) {
    return false
  }
}

const showPreview = ref(false)
const previewContent = ref('')
const previewType = ref('')

const handleFilePreview = async (url) => {
  const fileExt = url.split('.').pop().toLowerCase()
  
  // 如果是图片，保持原有逻辑
  if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExt)) {
    // 保持原有的图片预览逻辑
    return
  }

  try {
    // 对于文本文件和PDF
    if (['txt', 'md', 'json', 'pdf'].includes(fileExt)) {
      const response = await fetch(url)
      
      if (fileExt === 'pdf') {
        previewType.value = 'pdf'
        previewContent.value = url // PDF直接使用URL
      } else {
        previewType.value = 'text'
        previewContent.value = await response.text()
      }
      
      showPreview.value = true
    }
  } catch (error) {
    console.error('预览文件失败:', error)
  }
}
</script>

<style lang="scss">
// 而外的vue渲染的代码内容

.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fullscreen-preview {
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.button-row {
  // 让这个在右上角显示
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  gap: 5px;
  z-index: 10001;
}

// .custom_code {
//   background-color: black;
// }


.share-button {
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.share-button:hover {
  background-color: #388e3c;
}

// VueLiveEditor 样式修改
.fullscreen-preview .vue-live-editor {
  flex: 1;
  width: 100%;
  height: calc(100% - 40px); // 减去关闭按钮的高度
  margin-top: 40px; // 为关闭按钮留出空间
}

.content {
  min-height: 1rem;
  letter-spacing: 1px;
  // background: #f7f7f7;
  background-color: #f7f7f7;
  // padding: 40px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 8px;
  border: 1px solid #e1e0e0;

  // &>* {
  //   color: black;
  // }
  // .katex-display {
  //   margin: 1em 0;
  //   overflow-x: auto;
  //   overflow-y: hidden;
  // }
  
  // .katex {
  //   font-size: 1.1em;
  // }
  
  // .katex-inline {
  //   display: inline-block;
  //   padding: 0 0.2em;
  // }

  &.assistant-content {
    background-color: #f7f7f7;
    color: black;

    /* Light blue background for assistant */
    /* border-color: #b0d4ff; */
  }

  &.user-content {
    background-color: #5d5cd6;
    color: white;
    /* 将文字颜色设置为白色 */
    font-weight: bold;
    font-size: 18px;

    /* Adjust color as needed */
    /* border-color: #b0ffb0; */
  }

  .content .system-content {
    background-color: #fff0f0;
    /* Light red background for system */
    /* border-color: #ffb0b0; */
  }

  //h1 {
  //  font-size: 1.15rem;
  //  font-weight: 700;
  //  line-height: 1.6;
  //}

  h2 {
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.6;
  }

  h3,
  h4,
  h5 {
    font-size: 1.05rem;
    font-weight: 500;
    line-height: 1.4;
  }

  p {
    code {
      background-color: #f2f3f545;
      padding: 0 2px;
      border-radius: 2px;
      white-space: pre-wrap;
    }

    code:not(pre code) {
      color: red; // 蓝色文本
      background-color: #f2f1ea; // 白色背景
      padding: 1px 2px;
      font-family: 'Consolas', 'Courier New', monospace; // 用Consolas或其他等宽字体
      font-size: 1em; // 保持与周围文本相同的大小
      font-weight: normal; // 不加粗
      border: 1px solid #cccccc; // 浅灰色边框
      border-radius: 0; // 移除圆角
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); // 添加轻微阴影效果
      font-weight: bold; // 加粗
    }
  }

  pre {
    margin: 5px;
    border-radius: 5px;
    padding: 10px;

    position: relative;
    white-space: break-spaces;
    // background-color: #1e1e1e; // 深色背景，但不是纯黑
    // color: #e0e0e0; // 亮灰色文本，提高可读性
    // border: 1px solid #333; // 深色边框

    span {
      white-space: pre-wrap;
    }

    .copy-code {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: 14px;
      opacity: 0.7;
      cursor: pointer;
    }
  }

  img {
    max-width: 100%;
    max-height: 100%;
    height: 500px;
    border-radius: 5px;
  }
}

.typing {
  @keyframes blink {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  &:empty::before,
  &> :last-child::after {
    font-size: 1rem;
    margin: 0;
    font-family: 'Courier New';
    font-weight: bold;
    content: '|';
    animation: blink 500ms linear infinite alternate;
  }

  .conversation-item {
    position: relative; // 添加这一行

    margin-bottom: 20px;
  }

  .action-buttons {
    position: absolute;
    display: flex;
    gap: 12px;
    /* Increased from 8px */
    z-index: 1000;
    background: none;
    border: 1px solid #e0e0e0;
    border-radius: 9999px;
    padding: 6px 8px;
    /* Added horizontal padding */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: #f0f0f0;
    border: 1px solid #d0d0d0;
    border-radius: 4px;
    padding: 6px 10px;
    font-size: 14px;
    color: #333;
    margin: 0 2px;
    /* Added horizontal margin */

    &:hover {
      background-color: #f5f5f5;
    }

    svg {
      width: 20px;
      /* Adjusted size */
      height: 20px;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .text-text-500 {
    // 给上面的padding加一点
    padding: 2px 4px;
  }
}

.file-container {
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.file-info {
  display: flex;
  align-items: center;
  padding: 8px;
}

.file-name {
  margin: 0 10px;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #1890ff;  // 添加链接颜色
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
    color: #40a9ff;
  }
}

.mr-10px {
  margin-right: 10px;
}

.ml-10px {
  margin-left: 10px;
}
</style>
