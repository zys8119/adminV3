import {UserConfig} from 'vite'
import pluginVue from '@vitejs/plugin-vue'
import lessPlug from './ViteCconfig/plug/lessPlug'
export default <UserConfig>{
    plugins: [
        pluginVue(),
        lessPlug(),
    ],
}