/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from "react";

import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import CurrencyInput from "react-currency-input-field";
import { CURRENCY_TYPE } from "@/common/utils/constant";

interface IProps {
    name: string;
    class?: string;
    placeHolder?: string;
    required?: boolean;
    readOnly?: boolean;
    disable?: boolean;
    divClass?: any;
    onChange?: Function;
    value?: any;
    id?: string;
    label?: string;
    divHidden?: any;
    type?: string;
    register: any;
    errors: any;
}

export default function InputAmountReactForm(props: IProps) {
    const refList = useContext(appContext).refList;
    const { storeData, setStoreData, setDataError } = useStore(
        (state: IStore) => ({
            storeData: state.data,
            setStoreData: state.setData,
            setDataError: state?.setData,
        })
    );

    function handleOnChange(value: string, name: string) {
        setStoreData({ [name as keyof dataType]: value });
    }

    return (
        <div className="col-md-6">
            <div className="form-group form_box">
                <label>{props?.label}</label>
                <div className="form-label-group input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                        {CURRENCY_TYPE}
                    </span>
                    <CurrencyInput
                        {...props?.register(props.name)}
                        id={props?.id}
                        name={props.name}
                        value={
                            props.value
                                ? props.value
                                : (storeData[
                                      props.name as keyof dataType
                                  ] as any)
                        }
                        className={props?.class ? props?.class : "form-control"}
                        inputMode="numeric"
                        onValueChange={(value, name) =>
                            handleOnChange(value, name)
                        }
                        disabled={props.disable}
                        placeholder={props?.placeHolder}
                        readOnly={props?.readOnly}
                    />

                    {props?.errors?.[props.name] && (
                        <div className="error position-static text-start">
                            <>{props?.errors?.[props.name]?.message}</>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
