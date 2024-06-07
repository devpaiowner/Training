/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from "react";
import HtmlParse from "html-react-parser";
import { useTranslation } from "react-i18next";

import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import { number } from "nope-validator";
import validation from "@/common/utils/validation";
import { FaAsterisk } from "react-icons/fa";

interface IProps {
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
}

export default function ProfileInputForm(props: IProps) {
  const refList = useContext(appContext).refList;
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  const [focusClassName, setFocusClassName] = useState("");
  const [visible, setVisible] = useState(false);
  const toggleBtn = () => {
    setVisible((prevVisible) => !prevVisible);
  };
  const { myProfile } = storeData;

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

  const { t } = useTranslation("errorMessage");

  return (
    <div>
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
        <label htmlFor={props.htmlFor} className="text-black">
          {props.label}{" "}
          {props.required && <span className="required_star"> *</span>}
        </label>
      )}
      <div
        className={
          props?.extraStyle
            ? "form-group form_box input-group"
            : "form-group form_box"
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

        <input
          ref={refList?.[props.name]}
          id={props?.htmlFor}
          type={
            props?.type == "password"
              ? visible
                ? "text"
                : "password"
              : props?.type ?? "text"
          }
          name={props.name}
          value={
            storeData[props.name] || (myProfile && myProfile[props.name]) || ""
          }
          className={props?.class}
          placeholder={props?.placeHolder}
          style={props?.extraStyle && { width: "75%" }}
          readOnly={props?.readOnly}
          onChange={(e: any) => {
            handleOnChange(e);
            validation(
              { [props.name]: e.target.value },
              [props.name],
              setDataError,
              refList
            );
            // }
          }}
          disabled={props.disable}
        />

        {props.imagePath && (
          <span className="input_icon">
            <img
              src={`${process.env.NEXT_PUBLIC_BASEPATH}${props.imagePath}`}
              alt=""
            />
          </span>
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
        {storeData?.validation?.[props.name] && (
          <div className="error position-static text-start">
            {t(storeData?.validation?.[props.name])}
          </div>
        )}
      </div>{" "}
    </div>
  );
}
