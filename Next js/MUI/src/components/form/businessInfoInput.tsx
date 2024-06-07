/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect } from "react";
import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import { useFormContext } from "react-hook-form";

interface IProps {
    label?: string;
    name: string;
    id?: string;
    divClass?: string;
    type?: string;
    imagePath?: string;
    downText?: string;
    noneText?: string;
    required?: boolean;
    readOnly?: boolean;
    disable?: boolean;
    onChange?: Function;
    register: any;
    errors: any;
    option?: any;
}

export default function BusinessInfoInput(props: IProps) {
    const refList = useContext(appContext).refList;
    const { storeData, setStoreData } = useStore((state: IStore) => ({
        storeData: state.data,
        setStoreData: state.setData,
    }));

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setStoreData({ [props.name as keyof dataType]: e.target.value });
    }

    return (
        <>
            {props?.type === "select" ? (
                <div className="col-md-6">
                    <div className="form-group form_box">
                        <label>{props.label}</label>
                        <select
                            onChange={(e: any) => handleOnChange(e)}
                            className={"form-select form-control"}
                            // ref={refList?.[props.name]}
                            name={props.name}
                            value={
                                storeData[props.name as keyof dataType] as any
                            }
                            disabled={props?.readOnly}
                            {...props?.register(props.name)}
                        >
                            {props?.noneText && (
                                <option value="">{props?.noneText}</option>
                            )}
                            {props?.option?.map((option, index) => (
                                <option
                                    key={option.value + index}
                                    value={option.value}
                                >
                                    {option.text}
                                </option>
                            ))}
                        </select>
                        {props?.errors?.[props.name] && (
                            <div className="error position-static text-start">
                                <>{props?.errors?.[props.name]?.message}</>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={props?.divClass ? props?.divClass : "col-md-6"}>
                    <div className="form-group form_box">
                        <label>{props?.label}</label>
                        <input
                            // ref={refList?.[props.name]}
                            id={props?.id}
                            type={props?.type ? props?.type : "text"}
                            name={props.name}
                            value={
                                storeData[props.name as keyof dataType] as any
                            }
                            className="form-control"
                            readOnly={props?.readOnly}
                            onChange={(e: any) => {
                                handleOnChange(e);
                                if (props.onChange) {
                                    props.onChange(e.target.value);
                                }
                            }}
                            disabled={props.disable}
                            {...props?.register(props.name)}
                            // {...register(props.name)}
                        />
                        {props?.imagePath && (
                            <span className="input_icon ti ti-map-pin ti-md"></span>
                        )}
                        {props?.errors?.[props.name] && (
                            <div className="error position-static text-start">
                                <>{props?.errors?.[props.name]?.message}</>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* {storeData?.validation?.[props.name] && (
                <div className="error">
                    {storeData?.validation?.[props.name]}
                </div>
            )} */}
        </>
    );
}
