import { Plugin } from "vue"
import { mapState } from "vuex"

const airforcePlug:Plugin = {
    install(App){
        App.mixin({
            computed:{
                ...mapState(["airforce"])
            }
        })
    }
}
export default <Plugin> airforcePlug;