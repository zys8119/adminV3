import {createApp} from "vue"
import router from "./src/router"
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from "./src/App.vue"
import store from "./src/store"
import airforcePlug from "./src/store/plug/airforcePlug"
import alertPlug from "./src/store/plug/alertPlug"
import uiPlug from "./src/ui"
createApp(<any>App)
    .use(ElementPlus)
    .use(router)
    .use(store)
    .use(airforcePlug)
    .use(alertPlug)
    .use(uiPlug)
    .mount("#app")