/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from "react";
import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import validation from "@/common/utils/validation";
import { useTranslation } from "react-i18next";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface IProps {
  id?: string;
  type?: string;
  name: string;
  class?: string;
  label?: string;
  labelClass?: string;
  extraStyle?: boolean;
  htmlFor?: string;
  placeHolder?: string;
  required?: boolean;
  readOnly?: boolean;
  disable?: boolean;
  phonecode?: boolean;
  leftMargin?: boolean;
  onChange?: Function;
}

export default function InputForm(props: IProps) {
  const refList = useContext(appContext).refList;
  const { storeData, setStoreData, setDataError, setNewError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
      setNewError: state.setNewError,
    })
  );
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

  function handleOnChange(e: any) {
    setStoreData({ [props.name as keyof dataType]: e.target.value });
  }

  const { t } = useTranslation("errorMessage");
  const errorMessage = storeData?.validation?.[props.name];
  return (
    <>
      <div
        className={
          props?.extraStyle
            ? "form-group form_box input-group"
            : props?.leftMargin
            ? "form-group form_box ml-4"
            : "form-group form_box mr-4"
        }
      >
        {props.type === "file" && (
          <label
            className={props.labelClass && "form-control"}
            htmlFor={props.htmlFor}
          >
            {props.label}{" "}
            {props.required && props.type != "file" ? (
              <span className="required_star"> *</span>
            ) : null}
          </label>
        )}
        {props.type !== "file" && (
          <label
            className={props.labelClass && "form-control"}
            htmlFor={props.htmlFor}
          >
            {props.label}{" "}
            {props.required && props.type != "file" ? (
              <span className="required_star"> *</span>
            ) : null}
          </label>
        )}
        {props.type === "file" && (
          <label htmlFor={props.htmlFor}>
            {props.label}{" "}
            {props.required && <span className="required_star"> *</span>}
          </label>
        )}

        {props?.phonecode ? (
          <PhoneInput
            country="TZ"
            placeholder={props?.placeHolder}
            value={storeData[props.name as keyof dataType] as any}
            onChange={(value: any) => {
              const e = { target: { value, name: props.name } };
              handleOnChange(e);
              if (props.onChange) {
                props.onChange(e.target.value, props.name);
                validation(
                  { [props.name]: e.target.value },
                  [props.name],
                  setDataError,
                  refList
                );
              }
            }}
          />
        ) : (
          <input
            ref={refList?.[props.name]}
            id={props?.id}
            type={
              props?.type == "password"
                ? visible
                  ? "text"
                  : "password"
                : props?.type ?? "text"
            }
            name={props.name}
            value={storeData[props.name as keyof dataType] as any}
            className={props?.class ? props?.class : "form-control"}
            placeholder={props?.placeHolder}
            readOnly={props?.readOnly}
            onChange={(e: any) => {
              handleOnChange(e);
              if (props.onChange) {
                props.onChange(e.target.value, e.target.name);
                validation(
                  { [props.name]: e.target.value },
                  [props.name],
                  setDataError,
                  refList
                );
              }
            }}
            disabled={props.disable}
          />
        )}

        {props.type === "password" && (
          <span className="input_icon" onClick={toggleBtn}>
            {!visible ? (
              <img
                src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/icon/eye-closed.svg`}
                alt=""
              />
            ) : (
              <img
                src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/icon/eye.svg`}
                alt=""
              />
            )}
          </span>
        )}

        {errorMessage && (
          <div
            className="error"
            style={{ position: "static", textAlign: "left" }}
          >
            {t(errorMessage)}
          </div>
        )}
      </div>
    </>
  );
}
