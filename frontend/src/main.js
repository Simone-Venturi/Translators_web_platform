import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from '@/plugins/font-awesome'
import PrimeVue from 'primevue/config'
import "primevue/resources/primevue.min.css"
import "primevue/resources/themes/nova-vue/theme.css"
import "primeicons/primeicons.css"

createApp(App)
    .use(store)
    .use(router)
    .use(PrimeVue)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
