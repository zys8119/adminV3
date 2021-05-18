import {createApp} from "vue"
import store from "./src/store"
import airforcePlug from "./src/store/plug/airforcePlug"
import router from "./src/router"
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from "./src/App.vue"

createApp(App)
    .use(ElementPlus)
    .use(router)
    .use(store)
    .use(airforcePlug)
    .mount("#app")