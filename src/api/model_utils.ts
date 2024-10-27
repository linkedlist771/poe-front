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


// Add this new function
export function getRandomModels(count: number = 10) {
    // Convert modelData object to array of entries
    const modelEntries = Object.entries(modelData);
    
    // Shuffle the array
    const shuffled = modelEntries.sort(() => Math.random() - 0.5);
    
    // Take first 'count' items and transform them into the required format
    return shuffled.slice(0, count).map(([name, data]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
        icon: data.path,
        description: data.desc || 'No description available'
    }));
}