/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import { toast } from "react-toastify";
import { FILE_ACCEPT } from "@/common/utils/constant";
import { useTranslation } from "react-i18next";

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

export default function InputFile(props: IProps) {
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const refList = (useContext(appContext) as AppContext).refList;
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

  function handleOnChange(e: any) {
    // setStoreData({ [props.name as keyof dataType]: e.target.files[0] });
    if (e.target.files[0]) {
      upload(e.target.files[0]);
    }
  }

  const { t } = useTranslation("loanForm");
  const errorMessage = useTranslation("errorMessage").t;

  const [fileName, setFileName] = useState("");

  const upload = async (file: any) => {
    try {
      const res = (await apis.uploadDocument({
        fileData: file,
        link: props?.type,
        documentType: props?.name,
      })) as any;
      setFileName(res.title as any);
      setStoreData({
        [props.name]: {
          file: res.file,
          id: res.id,
          document_type: res.document_type?.slug,
          title: res.title,
        } as any,
      });
    } catch (err) {
      setStoreData({ buttonLoading: false });
      toast.error(JSON.stringify(err.message));
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <label className="text-black">
          {/* {storeData?.[props?.name]?.name ?? props?.title} */}
          {props?.title}
        </label>
        {storeData?.[props?.name] ? (
          <p className="text-black mb-0">
            {/* {storeData?.[props?.name]?.size} KB{" "} */}
            {storeData?.[props?.name]?.title}
            <span
              className="icon-delete ms-2"
              onClick={() => {
                deleteFile();
              }}
            >
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
          </p>
        ) : (
          <>
            <div className="btn btn-blue Upload-btn">
              {t("upload")}
              <input
                ref={refList?.[props.name]}
                type={"file"}
                name={props.name}
                onChange={(e: any) => {
                  handleOnChange(e);
                }}
                accept={FILE_ACCEPT}
              />
              {storeData?.validation?.[props.name] && (
                <div className="error">
                  {errorMessage(storeData?.validation?.[props.name])}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
