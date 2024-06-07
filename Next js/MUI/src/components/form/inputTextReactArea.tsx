/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from "react";
import HtmlParse from "html-react-parser";

import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";

interface IProps {
  id?: string;
  name?: string;
  placeHolder?: string;
  row?: number;
  label?: string;
  required?: boolean;
  readOnly?: boolean;
  handleChange?: Function;
  register?: any;
  onChange?: Function;
  errors: any;
}

export default function TextReactAreaForm(props: IProps) {
  const refList = useContext(appContext).refList;
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setData,
    })
  );

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStoreData({ [props.name as keyof dataType]: e.target.value });
  }
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
        {...props?.register(props.name)}
      ></textarea>
      {props?.errors?.[props.name] && (
        <div className="error position-static text-start">
          <>{props?.errors?.[props.name]?.message}</>
        </div>
      )}
    </>
  );
}
