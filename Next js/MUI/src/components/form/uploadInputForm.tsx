/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import React, { Fragment, useContext, useState } from "react";
import { toast } from "react-toastify";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import { FILE_ACCEPT } from "@/common/utils/constant";
import { Controller } from "react-hook-form";
interface IProps {
  label?: string;
  name?: string;
  id?: string;
  downText?: string;
  required?: boolean;
  readOnly?: boolean;
  disable?: boolean;
  onChange?: Function;
  register: any;
  errors: any;
  control: any;
  type: string;
  handleDocData: Function;
}

export default function UploadInputForm(props: IProps) {
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const refList = (useContext(appContext) as AppContext).refList;
  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));
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
          file: res.file as string,
          id: res.id as number,
          document_type: res.document_type?.slug as string,
          title: res.title as string,
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
      props?.handleDocData(props?.name);
      setFileName("");
      setStoreData({ [props?.name]: "" });
    } else {
      setStoreData({ buttonLoading: false });
      toast.error(res?.error?.[0]?.message);
    }
  };

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files[0]) {
      upload(e.target.files[0]);
    }
  }
  const filePath = fileName;
  return (
    <Fragment>
      <div className="col-md-6">
        <p className="mb-0">{props?.label}</p>
        <div className="form-group form_box">
          <label htmlFor={props?.id} className="form-control">
            {" "}
            {filePath && filePath}
          </label>
          <Controller
            control={props?.control}
            name={props?.name}
            rules={{ required: "Field is manadatory" }}
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <>
                  <input
                    {...field}
                    id={props?.id}
                    type="file"
                    name={props.name}
                    value={value?.fileName}
                    onChange={(event) => {
                      handleOnChange(event);
                      onChange(event.target.files[0]);
                    }}
                    onClick={(event) => {
                      event.currentTarget.value = null;
                    }}
                    accept={FILE_ACCEPT}
                    className="d-none"
                    readOnly={props?.readOnly}
                    disabled={props.disable}
                  />

                  <span className="input_icon">
                    {fileName ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/delete-red.png`}
                        onClick={() => {
                          deleteFile();
                        }}
                      />
                    ) : (
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/upload.png`}
                      />
                    )}
                  </span>
                </>
              );
            }}
          />

          {props.downText ? (
            <div>
              <small>{props.downText}</small>
              <span className="voter">
                {props?.errors?.[props.name]?.message}
              </span>
            </div>
          ) : (
            props?.errors?.[props.name] && (
              <div className="error">
                <>{props?.errors?.[props.name]?.message}</>
              </div>
            )
          )}
        </div>
      </div>
    </Fragment>
  );
}
