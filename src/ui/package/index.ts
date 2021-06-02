import {App} from "vue"
import ContentTable from  "./ContentTable.vue"
import ContentTableItem from  "./ContentTableItem.vue"
import ZButton from  "./ZButton.vue"
import Upload from  "./Upload.vue"
import Wangeditor from  "./Wangeditor.vue"
import Echarts from  "./Echarts.vue"
import Map from  "./Map.vue"
import Signature from  "./Signature.vue"
import Swiper from  "./Swiper.vue"
import SwiperItem from  "./SwiperItem.vue"
export default (vue:App)=>{
    vue.component("ContentTable", <any>ContentTable);
    vue.component("ContentTableItem", <any>ContentTableItem);
    vue.component("ZButton", <any>ZButton);
    vue.component("Upload", <any>Upload);
    vue.component("Wangeditor", <any>Wangeditor);
    vue.component("Echarts", <any>Echarts);
    vue.component("Map", <any>Map);
    vue.component("Signature", <any>Signature);
    vue.component("Swiper", <any>Swiper);
    vue.component("SwiperItem", <any>SwiperItem);
}

