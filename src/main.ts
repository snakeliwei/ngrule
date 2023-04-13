import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'

createApp(App).use(router).use(Varlet).mount('#app')
