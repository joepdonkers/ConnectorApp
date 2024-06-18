import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css';

const app = createApp(App)

app.use(router)
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,

})
app.mount('#app')
