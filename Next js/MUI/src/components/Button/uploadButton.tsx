/* eslint-disable @next/next/no-img-element */

import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import { Controller } from "react-hook-form";
import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import { FILE_ACCEPT } from "@/common/utils/constant";
import ProgressBar from "react-bootstrap/ProgressBar";
import Link from "next/link";

interface IProps {
  label?: string;
  name: string;
  id?: string;
  downText?: string;
  required?: boolean;
  readOnly?: boolean;
  disable?: boolean;
  onChange?: Function;
  register?: any;
  errors: any;
  control: any;
  requiredText: string;
  fieldText: string;
  type: string;
  onUpload: Function;
}

export default function UploadButton(props: IProps) {
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const refList = (useContext(appContext) as AppContext).refList;
  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));
  const [fileName, setFileName] = useState("");
  const [progressBar, setProgressBar] = useState(0);

  const progress = (e: any) => {
    setProgressBar(e);
    if (e === 100) {
      setProgressBar(0);
    }
  };

  const upload = async (file: any) => {
    setProgressBar(0);
    const res = await apis.uploadDocument({
      fileData: file,
      link: props?.type,
      documentType: props?.name,
      progress,
    });
    if (res) {
      setFileName(res.title as any);
      const doc = {
        file: res.file as string,
        id: res.id as number,
        title: res.title as any,
        document_type: res.document_type?.slug,
      } as any;
      setStoreData({
        [props.name]: doc,
      });
      props?.onUpload(doc);
    } else {
      setStoreData({ buttonLoading: false });
      toast.error(res?.error?.[0]?.message);
    }
  };

  const deleteFile = async () => {
    const res = await apis.deleteFile(fileName);
    if (res) {
      setFileName("");
      setStoreData({ [props?.name]: "" });
      setStoreData({ attachment_proof: "" });
    } else {
      setStoreData({ buttonLoading: false });
      toast.error(res?.error?.[0]?.message);
    }
  };

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStoreData({ [props.name as keyof dataType]: e.target.files[0] });
    if (e.target.files[0]) {
      upload(e.target.files[0]);
    }
  }

  return (
    <>
      <div className="col-6 text-start attachment">
        <label>{props?.requiredText}</label>
        {storeData?.[props?.name] ? (
          <p className="text-black">
            {progressBar !== 0 && (
              <>
                <ProgressBar
                  className="progress"
                  style={{ height: "8px", width: "30%" }}
                  now={progressBar}
                  variant="success"
                  visuallyHidden
                />
              </>
            )}
            <Link target="_blank" href={storeData?.[props?.name]?.file || ""}>
              {storeData?.[props?.name]?.title}
            </Link>
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
              <Controller
                control={props?.control}
                name={props?.name}
                rules={{
                  required: "Required",
                }}
                render={({ field: { value, onChange, ...field } }) => {
                  return (
                    <>
                      <span className="icon-attachment me-1"></span>
                      {props?.fieldText}
                      <input
                        {...field}
                        type="file"
                        name={props.name}
                        // value={
                        //     storeData?.[props?.name]
                        //         ?.name
                        // }
                        value={value?.fileName}
                        onChange={(event) => {
                          handleOnChange(event);
                          onChange(event.target.files[0]);
                        }}
                        accept={FILE_ACCEPT}
                        readOnly={props?.readOnly}
                        disabled={props.disable}
                      />
                    </>
                  );
                }}
              />

              {props?.errors?.[props.name] && (
                <div className="error">
                  <>{props?.errors?.[props.name]?.message}</>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
