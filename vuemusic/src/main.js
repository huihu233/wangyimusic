import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router/index'
import Vue3Marquee from 'vue3-marquee'
import '../public/js/rem'
import 'animate.css'
import App from './App.vue'


createApp(App).use(Vue3Marquee).use(createPinia()).use(router).mount('#app')
