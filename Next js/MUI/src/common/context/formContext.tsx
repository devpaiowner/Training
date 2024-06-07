import React from "react";

export interface FormContext {
    formLayoutState: object;
    add?: Function;
}
export let formContext: FormContext = {
    formLayoutState: {},
};
export default React.createContext(formContext);
