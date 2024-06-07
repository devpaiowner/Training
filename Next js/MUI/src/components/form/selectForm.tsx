/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from "react";

import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import validation from "@/common/utils/validation";
import { useTranslation } from "react-i18next";

interface IProps {
  name: string;
  options: Array<{ value: string; text: string }>;
  noneText: string;
  required?: boolean;
  label?: string;
  readOnly?: boolean;
  lblClass?: boolean;
  class?: string;
  divHide?: boolean;
  divClass?: boolean;
  OnChangeText?: any;
  defaultValue?: string;
}

export default function SelectForm(props: IProps) {
  const { OnChangeText } = props;
  const refList = useContext(appContext).refList;
  const [selectedValue, setSelectedValue] = useState(props.defaultValue || "");
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedValue(e.target.value);
    if (OnChangeText) {
      OnChangeText(e.target.value);
    } else {
      setStoreData({ [props.name as keyof dataType]: e.target.value });
    }
  }
  const { t } = useTranslation("errorMessage");

  return (
    <>
      <select
        onChange={(e: any) => {
          handleOnChange(e),
            validation(
              { [props.name]: e.target.value },
              [props.name],
              setDataError,
              refList
            );
        }}
        className={props?.class ? props?.class : "form-select form-control"}
        ref={refList?.[props.name]}
        name={props.name}
        value={
          (storeData[props.name as keyof dataType] as any) || selectedValue
        }
        disabled={props?.readOnly}
      >
        {props.noneText && <option value="">{props.noneText}</option>}
        {props.options?.map((option, index) => (
          <option key={option.value + index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {storeData?.validation?.[props.name] && (
        <div className="error position-static">
          {t(storeData?.validation?.[props.name])}
        </div>
      )}
    </>
  );
}
