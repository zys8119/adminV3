import {$ZAlert} from "./src/store/plug/alertPlug/Interface"
import { WindowCommonAxiosRequestConfig} from "./src/store/request/AxiosClassInterface";
import {AxiosPromise} from "axios";
import $utilsOptions from "./src/utils/Interface";
import { airforceStateType } from "./src/store/airforce";
declare module '@vue/runtime-core'  {
    export interface ComponentCustomProperties {
        $ZAlert:$ZAlert;
        axios(options:WindowCommonAxiosRequestConfig):AxiosPromise<any>;
        $utils:$utilsOptions;
        airforce:airforceStateType;
    }
}
declare global {
    interface ImportMeta {
        url:string;
        env: {
            BASE_URL?: string;
            DEV: boolean;
            MODE: "development" | "production";
            PROD: boolean;
            SSR: boolean;
        };
    }
}