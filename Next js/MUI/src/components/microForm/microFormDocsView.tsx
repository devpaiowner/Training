import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import appContext from "@/common/context/appContext";
import useStore, { IStore } from "@/common/zustand/store";
import Link from "next/link";

interface Iprops { }

export default function MicroFormDocsView() {
  const [agentCall, serAgentCall] = useState(false);
  const [docName, setDocName] = useState("Document");
  const refList = useContext(appContext).refList;
  const { t } = useTranslation("loanForm");
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setData,
    })
  );

  useEffect(() => {
    switch (storeData?.purpose) {
      case "Payroll advance": {
        setDocName(t("pay_slips_bank_statement"));
        break;
      }
      case "Emergency expenses": {
        setDocName(t("emergency_need_document"));
        break;
      }
      case "Office space": {
        setDocName(t("pay_rental_invoice"));
        break;
      }
      case "Inventory": {
        setDocName(t("pay_invoice_document"));
        break;
      }
      default: {
        setDocName(t("other_document"));
      }
    }
  }, [storeData?.purpose]);

  let documents = [
    storeData?.payrollDoc1,
    storeData?.payrollDoc2,
    storeData?.payrollDoc3,
  ];

  const toatlKycDocument = () => {
    let count = 0;
    documents?.map((item, index) => {
      if (item) {
        count += 1;
      }
    });
    return count;
  };
  return (
    <>
      <p className="display-7 text-dblue mt-3">{docName}</p>
      <div className="doc-upload w-75 mx-2">
        <h6>{t("documents")}</h6>
        <p className="text-dblue mb-0 px-3">
          {t("last")} {toatlKycDocument()} {t("documents")}
        </p>
        <hr className="mt-0 mx-3" />

        {docName === "Pay Invoice Document" && (
          <>
            <div className="d-flex justify-content-between align-items-center m-3">
              <label className="text-black d-flex align-items-center">
                <span className="icon-document ti-md me-2"></span>
                {t("lpo")}
              </label>
              <span>
                {storeData?.inventoryLpoStore?.title + " " ?? t("lpo")}
                <Link
                  href={storeData?.inventoryLpoStore?.file}
                  className="icon-view ms-1"
                  target="_blank"
                >
                  <span className="path1"></span>
                  <span className="path2"></span>
                </Link>
              </span>
            </div>
          </>
        )}

        {documents?.length > 0 &&
          documents?.map((item, index) => {
            if (item) {
              const filename = item.title;
              return (
                <div
                  className="d-flex justify-content-between align-items-center m-3"
                  key={index}
                >
                  <label className="text-black d-flex align-items-center">
                    <span className="icon-document ti-md me-2"></span>
                    {docName}
                    {index + 1}
                  </label>
                  <span>
                    {" "}
                    {filename && filename}{" "}
                    <Link
                      href={item.file}
                      className="icon-view ms-1"
                      target="_blank"
                    >
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </Link>
                  </span>
                </div>
              );
            }
          })}
      </div>
    </>
  );
}
