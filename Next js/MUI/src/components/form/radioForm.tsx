/* eslint-disable @next/next/no-img-element */

import React, { useContext } from "react";

import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";

interface IProps {
  check?: boolean;
  label?: string;
  type?: string;
  name: string;
  class?: string;
  placeHolder?: string;
  imagePath?: string;
  htmlFor?: string;
  extraStyle?: boolean;
  required?: boolean;
  labelClass?: boolean;
  readOnly?: boolean;
  disable?: boolean;
  onChange?: Function;
  handleChange?: Function;
  tableData?: boolean;
  value?: string;
}

export default function RadioForm(props: IProps) {
  const refList = useContext(appContext).refList;
  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStoreData({ [props.name as keyof dataType]: e.target.value });

    // props?.handleChange()
  }

  return (
    <input
      ref={refList?.[props.name]}
      name={props.name}
      type="radio"
      value={props.value}
      onChange={(e: any) => {
        handleOnChange(e);
        if (props.onChange) {
          props.onChange(e.target.value);
        }
      }}
      onClick={(e: any) => {
        handleOnChange(e);
        if (props.onChange) {
          props.onChange(e.target.value);
        }
      }}
      checked={props?.check}
    />
  );
}
