/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
interface IProps {
  label?: string;
  name?: string;
  id?: string;
  downText?: string;
  required?: boolean;
  readOnly?: boolean;
  disable?: boolean;
  onChange?: Function;
  type?: string;
  handleDocData?: Function;
}

export default function UploadProfileKyc(props: IProps) {
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

  return (
    <div className="col-md-12">
      <p className="mb-0">{props?.label}</p>
      <div className="form-group form_box">
        <input type="file" />
      </div>
    </div>
  );
}
