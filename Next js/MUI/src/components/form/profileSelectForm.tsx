/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import validation from "@/common/utils/validation";

interface IProps {
    name: string;
    options: Array<{ value: string; text: string }>;
    noneText: string;
    required?: boolean;
    label?: string;
    readOnly?: boolean;
    lblClass?: boolean;
    selectClass?: boolean;
    divHide?: boolean;
    divClass?: boolean;
}

export default function ProfileSelectForm(props: IProps) {
    const refList = useContext(appContext).refList;
    const { storeData, setStoreData, setDataError } = useStore(
        (state: IStore) => ({
            storeData: state.data,
            setStoreData: state.setData,
            setDataError: state.setDataError,
        })
    );

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setStoreData({ [props.name as keyof dataType]: e.target.value });
    }
    const { t } = useTranslation("errorMessage");

    return (
        <>
            {!props?.divHide ? (
                <div
                    className={
                        props?.divClass
                            ? "d-flex align-items-center mt-4 col-bill-to"
                            : "form-group form_box"
                    }
                    // className={
                    //     props?.divClass
                    //         ? "d-flex align-items-center mt-4 col-bill-to"
                    //         : props?.divClass
                    // }
                >
                    {props.label && (
                        <label
                            htmlFor={props.label}
                            className={props?.lblClass && "invoice-to-title"}
                        >
                            {props.label}{" "}
                            {props.required && (
                                <span className="required_star"> *</span>
                            )}
                        </label>
                    )}
                    <select
                        onChange={(e: any) => {
                            handleOnChange(e);
                            validation(
                                { [props.name]: e.target.value },
                                [props.name],
                                setDataError,
                                refList
                            );
                        }}
                        className={
                            props?.selectClass
                                ? "invoiceto form-control"
                                : "form-select form-control"
                        }
                        ref={refList?.[props.name]}
                        name={props.name}
                        value={storeData[props.name as keyof dataType] as any}
                        disabled={props?.readOnly}
                    >
                        {props.noneText && (
                            <option value="">{props.noneText}</option>
                        )}
                        {props.options?.map((option, index) => (
                            <option
                                key={option.value + index}
                                value={option.value}
                            >
                                {option.text}
                            </option>
                        ))}
                    </select>
                    {storeData?.validation?.[props.name] && (
                        <div className="error position-static text-start">
                            {t(storeData?.validation?.[props.name])}
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <select
                        onChange={(e: any) => {
                            handleOnChange(e);
                            validation(
                                { [props.name]: e.target.value },
                                [props.name],
                                setDataError,
                                refList
                            );
                        }}
                        className={
                            props?.selectClass
                                ? "invoiceto form-control"
                                : "form-select form-control"
                        }
                        ref={refList?.[props.name]}
                        name={props.name}
                        value={storeData[props.name as keyof dataType] as any}
                        disabled={props?.readOnly}
                    >
                        {props.noneText && (
                            <option value="">{props.noneText}</option>
                        )}
                        {props.options?.map((option, index) => (
                            <option
                                key={option.value + index}
                                value={option.value}
                            >
                                {option.text}
                            </option>
                        ))}
                    </select>
                    {storeData?.validation?.[props.name] && (
                        <div className="error position-static text-start">
                            {t(storeData?.validation?.[props.name])}
                        </div>
                    )}
                </>
            )}
        </>
    );
}
