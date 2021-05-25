import { Plugin } from "vue"
import ContentTable from "./ContentTable"
import * as uiPackage from "./package/index"
const plug:Plugin = {
    install(vue){
        console.log(uiPackage)
        vue.mixin(ContentTable);
    }
}
export default plug