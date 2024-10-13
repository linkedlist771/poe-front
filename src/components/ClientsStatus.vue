<template>
    <a-config-provider :theme="isDarkTheme ? darkTheme : undefined">
        <a-message-provider>
            <HeaderComponent />
        </a-message-provider>
        <!-- <GitHub /> -->

        <div style="margin-top:40px;">
            <Index :isDarkTheme="isDarkTheme" @changeIsDarkTheme="changeIsDarkTheme" />
        </div>
    </a-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { theme } from 'ant-design-vue';
import HeaderComponent from './HeaderComponent.vue';
import Index from './Index.vue';
import {
    ConfigProvider as AConfigProvider,
    message,
} from 'ant-design-vue';

const KEY = 'isDarkTheme';
const localDarkTheme = localStorage.getItem(KEY);
const isDarkTheme = ref(localDarkTheme === 'true');

const darkTheme = {
    algorithm: theme.darkAlgorithm,
};

const changeIsDarkTheme = (v: boolean) => {
    isDarkTheme.value = v;
    localStorage.setItem(KEY, String(v));
};
</script>