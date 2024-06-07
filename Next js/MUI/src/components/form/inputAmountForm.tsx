/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from "react";

import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import CurrencyInput from "react-currency-input-field";
import { CURRENCY_TYPE } from "@/common/utils/constant";
import validation from "@/common/utils/validation";
import { useTranslation } from "react-i18next";

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
}

export default function InputAmountForm(props: IProps) {
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
  const { t } = useTranslation("errorMessage");

  return (
    <>
      <div className="form-label-group input-group mb-4">
        <span className="input-group-text" id="basic-addon1">
          {CURRENCY_TYPE}
        </span>
        <CurrencyInput
          id={props?.id}
          name={props.name}
          value={
            props.value
              ? props.value
              : (storeData[props.name as keyof dataType] as any)
          }
          className={props?.class ? props?.class : "form-control"}
          inputMode="numeric"
          onValueChange={(value, name) => {
            handleOnChange(value, name);
            if (props.onChange) {
              props?.onChange(value);
            }
          }}
          disabled={props.disable}
          placeholder={props?.placeHolder}
          readOnly={props?.readOnly}
        />
        <label htmlFor={props?.id}>{props?.placeHolder}</label>

        {storeData?.validation?.[props.name] && (
          <div className="error position-static text-start">
            {t(storeData?.validation?.[props.name])}
          </div>
        )}
      </div>
    </>
  );
}
