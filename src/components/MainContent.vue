<template>
    <div class="main-container">
    <div class="main-content">
      <div class="header">
        <!-- <h1>Explore</h1> -->
        <!-- <img src="../assets/poe_logo.svg" alt="Poe Logo" class="logo" /> -->
        <div class="header-logo">
         <img src="../assets/poe_logo.svg" alt="Poe Logo" class="header-logo" />
      </div>
              
        <div class="search-container">
          <input type="text" placeholder="Start a new chat" class="search-input" />
          <button class="add-button">+</button>
          <button class="mic-button">🎤</button>
          <button class="send-button">➡️</button>
        </div>
      </div>
      <div class="bot-sections">
        <div class="section">
          <div class="section-header">
            <h2>Official bots</h2>
            <a href="#" class="see-all">See all</a>
          </div>
          <div class="bot-grid">
            <div v-for="bot in officialBots" :key="bot.name" class="bot-item">
              <img :src="bot.icon" :alt="bot.name" class="bot-icon" />
              <div class="bot-info">
                <h3>{{ bot.name }}</h3>
                <p>{{ bot.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="section-header">
            <h2>Bots for you</h2>
            <a href="#" class="see-all">See all</a>
          </div>
          <div class="bot-grid">
            <div v-for="bot in botsForYou" :key="bot.name" class="bot-item">
              <img :src="bot.icon" :alt="bot.name" class="bot-icon" />
              <div class="bot-info">
                <h3>{{ bot.name }}</h3>
                <p>{{ bot.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const officialBots = ref([
    { name: 'Assistant', icon: '🤖', description: 'General-purpose assistant bot. For queries requiring u...' },
    { name: 'Claude-3.5-Son...', icon: '🌟', description: 'Anthropic\'s most powerful model. Excels in complex...' },
    { name: 'FLUX-pro-1.1', icon: '🖼️', description: 'State-of-the-art image generation with top-of-the-line...' },
    { name: 'Playground-v3', icon: '🎮', description: 'Latest image model from Playground, with industry leadi...' },
    { name: 'Web-Search', icon: '🌐', description: 'Web-enabled assistant bot that searches the intern...' },
    { name: 'o1-mini', icon: '🔮', description: 'This OpenAI model is a faster, cheaper version of o1 that is...' },
    { name: 'Ideogram-v2', icon: '🧠', description: 'Latest image model from Ideogram, with industry leading...' },
    { name: 'GPT-4o-Mini', icon: '🤖', description: 'OpenAI\'s latest model. This intelligent small...' },
  ]);
  
  const botsForYou = ref([
    { name: 'PythonAIChat', icon: '🐍', description: 'Python programming how know everythin...' },
    { name: 'Wolfram-math-1', icon: '🧮', description: 'Wolfram-math is and advanced math...' },
    { name: 'einstein-chatgpt', icon: '👨‍🔬', description: 'Meet the founder of the theory of...' },
    { name: 'Python_Expert', icon: '🐍', description: 'I am an expert in python programmin...' },
  ]);
  </script>
  
  <style scoped>
  .main-container{
    width: 80%;
    height: 100vh;
  }
  .main-content {
    /* max-width: 1200px; */
    /* width:50%; */
    height: 100vh;

    margin: 0 auto;
    padding: 20px;
    overflow-y: auto;
  }
  
  .header {
    margin-bottom: 20px;
  }
  .header-logo{
    margin: 0 auto;
    width: 148px;
    height: auto;
  }
  
  .search-container {
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 20px;
    padding: 5px;
  }
  
  .search-input {
    flex-grow: 1;
    border: none;
    background-color: transparent;
    padding: 10px;
    font-size: 16px;
  }
  
  .add-button, .mic-button, .send-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    margin-left: 5px;
  }
  
  .bot-sections {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .see-all {
    color: #007bff;
    text-decoration: none;
  }
  
  .bot-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .bot-item {
    display: flex;
    align-items: center;
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 10px;
  }
  
  .bot-icon {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 8px;
  }
  
  .bot-info h3 {
    margin: 0;
    font-size: 16px;
  }
  
  .bot-info p {
    margin: 5px 0 0;
    font-size: 14px;
    color: #666;
  }
  </style>