// src/utils/modelUtils.ts

import modelData from '../data/models.json'

export function getImageUrl(name: string): string {
    return new URL(`../assets/avatars/${name}`, import.meta.url).href;
}

export function getModelInformation(name: string){
    return modelData[name.toLowerCase()]
}

export function getAvatarForModel(name: string): string {
    const model = modelData[name.toLowerCase()]
    // console.log(model)
    if (!model) return getImageUrl('gpt4.jpeg')
    return getImageUrl(model.path)
}
