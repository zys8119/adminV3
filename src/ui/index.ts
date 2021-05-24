import { Plugin } from "vue"
import ContentTable from "./ContentTable"
import "./package/index"
const plug:Plugin = {
    install(vue){
        vue.mixin(ContentTable);
    }
}
export default plug