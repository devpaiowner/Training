import React, { useContext, useEffect, useState } from "react";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import { FILE_ACCEPT } from "@/common/utils/constant";
import { useTranslation } from "react-i18next";

interface Iprops {
  handleFormChange: Function;
  removeFields: Function;
  indexNo: number;
  item: any;
  name: string;
  title: string;
}

export default function MutipleUpload(props: Iprops) {
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  const { t } = useTranslation("common");

  return (
    <div
      className={
        props?.name === "lpoDoc"
          ? "d-flex justify-content-between align-items-center"
          : "d-flex justify-content-between align-items-center mb-3"
      }
    >
      <label className="text-black">{props?.title}</label>
      {props?.item ? (
        <p className="text-black mb-0">
          {/* {input.lpoDocPath} KB{" "} */}
          {props?.item?.title}
          <span
            className="icon-delete ms-2"
            onClick={() => props?.removeFields(props?.indexNo, props?.name)}
          >
            <span className="path1"></span>
            <span className="path2"></span>
          </span>
        </p>
      ) : (
        <div className="btn btn-blue Upload-btn">
          {t("upload")}
          <input
            type={"file"}
            name={props?.name}
            onChange={(event) => props?.handleFormChange(props?.indexNo, event)}
            accept={FILE_ACCEPT}
          />
        </div>
      )}
    </div>
  );
}
