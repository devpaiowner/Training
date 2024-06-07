/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from "react";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import { toast } from "react-toastify";
import { FILE_ACCEPT } from "@/common/utils/constant";

interface IProps {
  id?: string;
  type?: string;
  name: string;
  class?: string;
  placeHolder?: string;
  required?: boolean;
  readOnly?: boolean;
  disable?: boolean;
  onChange?: Function;
  title?: string;
  store?: string;
}

export default function OtherKycDocuments(props: IProps) {
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const refList = (useContext(appContext) as AppContext).refList;
  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));
  const [focusClassName, setFocusClassName] = useState("");

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
    setStoreData({ [props.name as keyof dataType]: e.target.files[0] });
    if (e.target.files[0]) {
      upload(e.target.files[0]);
    }
  }

  const [fileName, setFileName] = useState("");
  const upload = async (file: any) => {
    const res = await apis.uploadDocument({
      fileData: file,
      link: props?.type,
      documentType: "other",
    });

    if (res) {
      setFileName(res["title"] as any);
      setStoreData({
        [props?.name]: {
          title: res["title"],
          id: res.id,
          file: res.file,
          document_type: res.document_type?.slug,
        },
      });
    } else {
      setStoreData({ buttonLoading: false });
      toast.error(JSON.stringify(res));
    }
  };

  const deleteFile = async () => {
    const res = await apis.deleteFile(fileName);
    if (res) {
      setFileName("");
      setStoreData({ [props?.name]: "" });
      setStoreData({ [props?.store]: "" });
    } else {
      setStoreData({ buttonLoading: false });
      toast.error(res?.error?.[0]?.message);
    }
  };

  return (
    <>
      {storeData?.[props?.name]?.name ? (
        <div className="other_box">
          <label htmlFor={props?.id} className="form-control">
            <small>{storeData?.[props?.name]?.name}</small>
            <span
              className="icon-delete"
              onClick={() => {
                deleteFile();
              }}
            >
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
          </label>
        </div>
      ) : (
        <div className="other_box">
          <label htmlFor={props?.id} className="form-control">
            <img src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/plus.png`} />{" "}
          </label>
          <input
            ref={refList?.[props.name]}
            type="file"
            name={props?.name}
            id={props?.id}
            onChange={(e: any) => {
              handleOnChange(e);
            }}
            accept={FILE_ACCEPT}
            className="d-none"
          />
        </div>
      )}
    </>
  );
}
