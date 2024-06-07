/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from "react";
import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";

interface IProps {
  value?: string;
  id?: string;
  type?: string;
  name?: string;
  class?: string;
  placeHolder?: string;
  required?: boolean;
  readOnly?: boolean;
  disable?: boolean;
  onChange?: Function;
}

export default function InputViewForm(props: IProps) {
  const refList = useContext(appContext).refList;
  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));
  const [focusClassName, setFocusClassName] = useState("");
  const [visible, setVisible] = useState(false);
  const toggleBtn = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    handleOnFocus("unFocus");
  }, []);

  const handleOnFocus = (type = "focus") => {
    if (
      type === "focus" ||
      (storeData[props.name as keyof dataType] as string)?.length > 0
    ) {
      return setFocusClassName("focused");
    }
    return setFocusClassName("");
  };

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStoreData({ [props.name as keyof dataType]: e.target.value });
  }
  return (
    <input
      value={props?.value}
      className={props?.class ? props?.class : "form-control"}
      placeholder={props?.placeHolder}
      readOnly={props?.readOnly}
      disabled={props.disable}
      onChange={handleOnChange}
    />
  );
}
