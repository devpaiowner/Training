/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from "react";
import HtmlParse from "html-react-parser";

import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import validation from "@/common/utils/validation";
import { useTranslation } from "react-i18next";

interface IProps {
    id?: string;
    name?: string;
    placeHolder?: string;
    row?: number;
    label?: string;
    required?: boolean;
    readOnly?: boolean;
    handleChange?: Function;
}

export default function TextAreaForm(props: IProps) {
    const refList = useContext(appContext).refList;
    const { storeData, setStoreData, setDataError, setNewError } = useStore(
        (state: IStore) => ({
            storeData: state.data,
            setStoreData: state.setData,
            setDataError: state.setDataError,
            setNewError: state.setNewError,
        })
    );

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setStoreData({ [props.name as keyof dataType]: e.target.value });
    }

    const { t } = useTranslation("errorMessage");

    return (
        <>
            <textarea
                name={props.name}
                rows={props.row}
                className="form-control"
                placeholder={props?.placeHolder}
                onChange={(e: any) => {
                    handleOnChange(e);
                }}
                value={storeData[props.name as keyof dataType] as any}
                readOnly={props?.readOnly}
                onKeyUp={(e) => {
                    setNewError({ [props?.name]: "" });
                }}
                disabled={props?.readOnly}
            ></textarea>
            {storeData?.validation?.[props.name] && (
                <div className="error position-static text-start">
                    {t(storeData?.validation?.[props.name])}
                </div>
            )}
        </>
    );
}
