import {createApp} from "vue"
import App from "./src/App.vue"
import store from "./src/store"
import airforcePlug from "./src/store/plug/airforcePlug"
import router from "./src/router"

createApp(App)
    .use(router)
    .use(store)
    .use(airforcePlug)
    .mount("#app")