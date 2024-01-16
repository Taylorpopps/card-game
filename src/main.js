/* eslint-disable import/order */
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router'
import { createApp } from 'vue'

const app = createApp(App)
app.config.devtools = true;

app.use(vuetify)
app.use(router)
app.mount('#app')
