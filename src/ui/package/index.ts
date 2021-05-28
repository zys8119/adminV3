import {App} from "vue"
import ContentTable from  "./ContentTable.vue"
import ContentTableItem from  "./ContentTableItem.vue"
import ZButton from  "./ZButton.vue"
import Upload from  "./Upload.vue"
import Wangeditor from  "./Wangeditor.vue"
import Echarts from  "./Echarts.vue"
export default (vue:App)=>{
    vue.component("ContentTable", ContentTable);
    vue.component("ContentTableItem", ContentTableItem);
    vue.component("ZButton", ZButton);
    vue.component("Upload", Upload);
    vue.component("Wangeditor", Wangeditor);
    vue.component("Echarts", Echarts);
}

