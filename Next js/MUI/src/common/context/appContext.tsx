import Api from "@common/apis/apis";
import { dataType } from "@common/zustand/store";
import React from "react";
export interface AppDataTypes {
    _socketClient?: string;
}
export interface AppContext {
    apis: any;
    appData: AppDataTypes;
    refList: object;
}
export let appContext: AppContext = {
    apis: {},
    appData: {},
    refList: {},
};
export default React.createContext(appContext);
