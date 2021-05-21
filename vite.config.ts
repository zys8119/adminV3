import {UserConfig} from 'vite'
import pluginVue from '@vitejs/plugin-vue'
import lessPlug from './ViteCconfig/plug/lessPlug'
import {resolve} from "path"
export default <UserConfig>{
    plugins: [
        pluginVue(),
        lessPlug([
            resolve(__dirname,"./src/assets/less/constant.less"),
        ]),
    ],
}