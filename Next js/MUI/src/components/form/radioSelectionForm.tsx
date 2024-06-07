import React, { useContext, useEffect, useState } from "react";

import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import validation from "@/common/utils/validation";
interface Iprops {
    handleChange?: Function;
    name?: string;
    value?: string;
    selection?: string;
    class?: string;
    disable?: boolean;
}
export default function RadioSelectionForm(props: Iprops) {
    const refList = useContext(appContext).refList;
    const { storeData, setStoreData, setDataError, setNewError } = useStore(
        (state: IStore) => ({
            storeData: state.data,
            setStoreData: state.setData,
            setDataError: state.setDataError,
            setNewError: state.setNewError,
        })
    );

    function handleOnChange(value: string) {
        setStoreData({ [props.name as keyof dataType]: value });
    }
    return (
        <input
            type="radio"
            name={props.name}
            checked={
                (storeData[props.name as keyof dataType] as any) ===
                    props?.value && true
            }
            onClick={(e) => {
                props?.handleChange(props?.value, props?.name);
                handleOnChange(props?.value);
                validation(
                    { [props.name]: props?.value },
                    [props.name],
                    setDataError,
                    refList
                );
            }}
            // value={props?.value}
            value={storeData[props.name as keyof dataType] as any}
            className={props?.class && props?.class}
            disabled={props?.disable}
        />
    );
}
