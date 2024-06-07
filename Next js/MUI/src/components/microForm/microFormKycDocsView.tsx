import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import appContext from "@/common/context/appContext";
import useStore, { IStore } from "@/common/zustand/store";
import Link from "next/link";
interface Iprops { }

export default function MicroFormKycDocsView() {
  const { t } = useTranslation("loanForm");
  const refList = useContext(appContext).refList;
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setData,
    })
  );

  let documents = [
    storeData?.trading_license,
    storeData?.lease_agreement,
    storeData?.title_deed,
    storeData?.power_attorney,
    storeData?.tbs,
  ];

  const toatlKycDocument = () => {
    return documents?.map((f) => f).length;
  };

  return (
    <>
      <p className="display-7 text-dblue mt-3">
        {t("recommended_kyc_documents")}
      </p>
      <div className="doc-upload w-75 mx-2">
        <h6>{t("documents")}</h6>
        <p className="text-dblue mb-0 px-3">
          {t("last")} {toatlKycDocument()} {t("kyc_document")}
        </p>
        <hr className="mt-0 mx-3" />
        {documents
          ?.filter((d) => d)
          .map((item, index) => {
            return (
              <div
                className="d-flex justify-content-between align-items-center m-3"
                key={index}
              >
                <label className="text-black d-flex align-items-center">
                  <span className="icon-document ti-md me-2"></span>
                  {t(item.document_type)}
                </label>
                <span>
                  {item?.title}
                  <Link
                    href={item?.file || ""}
                    className="icon-view ms-1"
                    target="_blank"
                  >
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </Link>
                </span>
              </div>
            );
          })}
      </div>
    </>
  );
}
