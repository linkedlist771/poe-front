import { pickBy } from 'lodash-es'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { baseUrl } from '../config/constants'
import { message } from 'ant-design-vue'

export const ErrorStatus = {
  400: '用户请求发生错误。',
  480: 'APIKEY已经过期或者不存在，请检查您的APIKEY是否正确。',
  481: '用户上传图片失败，可以重试或检查图片格式。',
  482: '用户上传文件失败，可以重试或检查文件格式。'
}
export interface IChatOptions {
  payload: any
  message: string
  model: string
  // url: string;
  api_key: string
  // max_tokens?: number;
  // carries: { role: string; content: string }[];
  // system_prompt: string;
  // probability_mass?: number;
  controller?: AbortController
  onProgress: (content: string, options: { done: boolean; id?: string }) => void
  onError: (err: any) => void
}

// const url = "198.23.176.34:6239";
const url = baseUrl

const apiRoute = '/api/v1'
const chatRoute = '/claude/form_chat'
const documentConversionRoute = '/claude/convert_document'
const imageUploadRoute = '/claude/upload_image'
const conversationHistoryRoute = '/conversation_history/get_conversation_histories'
const removeConversationHistoryRoute = '/conversation_history/delete_all_conversations'
// "/api/v1/claude/chat";

const streamingUrl = `${url}${apiRoute}${chatRoute}`
export const documentConversionUrl = `${url}${apiRoute}${documentConversionRoute}`
export const imageUploadUrl = `${url}${apiRoute}${imageUploadRoute}`
const conversationHistoryUrl = `${url}${apiRoute}${conversationHistoryRoute}`
export const removeConversationHistoryUrl = `${url}${apiRoute}${removeConversationHistoryRoute}`

export function getQueryParam(key: string) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(key)
}



export async function fetchConversation(
  clientIdx: number,
  conversationType: string,
  apiKey: string
) {
  try {
    const response = await fetch(conversationHistoryUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_idx: clientIdx,
        conversation_type: conversationType,
        api_key: apiKey
      })
    })
    const responseData = await response.json() // 解析 JSON 数据并存储

    // console.log(responseData)
    return responseData // Return the parsed JSON data
  } catch (error) {
    console.error('Error:', error)
  }
}

function buildParams(options: IChatOptions) {
  const payload = {
    stream: true,
    message: options.message,
    model: options.model,
    ...options.payload
  }
  return pickBy(payload, (val: any) => val !== undefined)
}

export async function chat(options: IChatOptions) {
  if (!options.api_key) {
    message.error('请提供有效的 API KEY')
    throw new Error('请提供有效的 API KEY')
  }

  const params = buildParams(options)
  
  const formData = new FormData()
console.log(params)
// 将params对象的每个属性添加到FormData中
  Object.entries(params).forEach(([key, value]) => {
    // if (key === 'files' && Array.isArray(value)) {
    //   // 处理文件数组
    //   value.forEach((file, index) => {
    //     if (file.originFileObj) {
    //       formData.append(`file${index}`, file.originFileObj, file.name);
    //     }
    //   });
    // } 
    if (key === 'files' && Array.isArray(value)) {
      // 处理文件数组
      value.forEach((file, index) => {
        if (file.originFileObj) {
          // 使用同一个key 'files'来添加所有文件，这会创建一个文件列表
          formData.append('files', file.originFileObj, file.name);
        }
      });
    } 
    
    else if (typeof value === 'object' && value !== null) {
      // 如果值是对象（但不是File），将其转换为JSON字符串
      formData.append(key, JSON.stringify(value))
    } else {
      // 其他类型的值直接添加
      formData.append(key, value)
    }
  })

console.log(formData)
  const response = await fetchEventSource(streamingUrl, {
    method: 'POST',
    body:  formData,//JSON.stringify(params),
    headers: {
      Accept: 'text/event-stream',
      // 'Content-Type': 'application/json', // 指定请求体格式为 JSON
      Authorization: options.api_key
    },
    signal: options.controller?.signal,
    openWhenHidden: true,
    // keepalive: true,
    async onopen(response) {
      if (response.ok) {
        return
      } else {
        const err = await response.json()
        const message = ErrorStatus[response.status] || err.detail
        options.onError && options.onError(message || '链接打开失败')
        if (response.status == 480) {
          localStorage.removeItem('SJ_API_KEY')
          window.location.href = '/chat'
        }
      }
    },
    onmessage(event) {
      const data = JSON.parse(event.data)
      if (data.message == 'closed') {
        options.onProgress('', { done: true, id: data.id })
        return
      } else {
        options.onProgress(data.message, { done: false })
      }
    },
    onerror(err) {
      options.onError && options.onError('链接异常')
      //  这里怎么终止整个chat?
      console.log(err)
      options.controller?.abort()

      throw new Error(`链接打开失败: ${message}`)
    }
  }).catch((err) => {
    options.onError && options.onError('链接超时，请刷新页面重新开始对话或更换账号。')
  })
}

export async function deleteAllConversation(
  clientIdx: string,
  conversationType: string,
  apiKey: string
) {
  try {
    const response = await fetch(removeConversationHistoryUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_idx: clientIdx,
        conversation_type: conversationType,
        api_key: apiKey
      })
    })
    return response.json() // Return the parsed JSON data
  } catch (error) {
    console.error('Error:', error)
  }
}
