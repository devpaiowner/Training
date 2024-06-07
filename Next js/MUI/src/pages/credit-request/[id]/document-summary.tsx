import React, { useContext, useEffect } from "react";
import appContext, { AppContext } from "@/common/context/appContext";
import useStore, { IStore } from "@/common/zustand/store";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import parse from "html-react-parser";
import Api from "@/common/apis/apis";
import { useRouter } from "next/router";
import NavbarBanner from "@/components/layout/NavbarBanner";
import Sidebar from "@/components/SidebarLayout";
import Header from "@/components/layout/Header";
import BackButton from "@/components/Button/backButton";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function DocumentSummary() {
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));

  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation("common");
  const { socketStatus, getLoanApplicationByIdStatus } = storeData;

  useEffect(() => {
    if (socketStatus === ReadyState.OPEN) {
      getLoanApplicationById("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketStatus]);

  const getLoanApplicationById = async (search?: any) => {
    setStoreData({ buttonLoading: true });
    const res = await apis.getLoanApplicationById(id);
    if (res.statusCode === 200) {
      setStoreData({ [res?.["traceId"]]: "getLoanApplicationByIdStatus" });
    } else {
      setStoreData({ buttonLoading: false });
      toast.error(res?.["message"]);
    }
  };

  useEffect(() => {
    if (getLoanApplicationByIdStatus?.["statusCode"] === 200) {
      setStoreData({ buttonLoading: false });
      setStoreData({
        loanApplicationById: getLoanApplicationByIdStatus?.["data"],
      });
    } else if (getLoanApplicationByIdStatus?.["statusCode"] !== 200) {
      setStoreData({ buttonLoading: false });
      toast.error(getLoanApplicationByIdStatus?.["msg"]);
    }

    return () => {
      setStoreData({
        getLoanApplicationByIdStatus: undefined,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLoanApplicationByIdStatus]);

  async function downloadImage(imageSrc, nameOfDownload = "image") {
    const name = nameOfDownload;
    const response = await fetch(imageSrc);

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = name;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  }

  const kycTitle = (value: string) => {
    switch (value) {
      case "trading_license":
        return t("trading_license");

      case "lease_agreement":
        return t("lease_agreement");

      case "title_deed":
        return t("title_deed");

      case "power_attorney":
        return t("power_attorney");

      case "tbs":
        return t("tbs");

      case "payrollDoc1":
        return storeData?.loanApplicationById?.purpose + " " + 1;

      case "payrollDoc2":
        return storeData?.loanApplicationById?.purpose + " " + 2;

      case "payrollDoc3":
        return storeData?.loanApplicationById?.purpose + " " + 3;

      case "inventoryLpoStore":
        return t("lpo");
      default:
        return t(value || "");
    }
  };

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar activeClass="Credit Request" />
          <div className="layout-page">
            <NavbarBanner />

            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <Header title={parse(t("document_summary_title"))} />

                <div className="card p-50">
                  <h4 className="my-2 text-center text-dblue">
                    {t("credit_request_document_summary")}{" "}
                  </h4>
                  <p className="text-dblue wd-80 mx-auto text-center">
                    {t("all_doc_attached")}
                  </p>

                  <div className="mt-5 w-100 px-5 mx-auto">
                    {storeData?.loanApplicationById?.documents?.length > 0 &&
                      storeData?.loanApplicationById?.documents?.map(
                        (item, index) => {
                          return (
                            <div
                              key={index}
                              className="d-flex justify-content-between align-items-center mt-3"
                            >
                              <label className="text-black flex-grow-1 d-flex align-items-center">
                                <span className="icon-document ti-md me-2"></span>{" "}
                                {kycTitle(item?.document_type)}
                              </label>
                              <span className="me-3">
                                {item.title}
                                <Link
                                  href={item.file}
                                  className="icon-view ms-1"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </Link>
                              </span>

                              <button
                                className="btn btn-fill btn-sm"
                                type="button"
                                onClick={() => {
                                  downloadImage(item?.file, item.title);
                                }}
                              >
                                {t("download")}
                              </button>
                            </div>
                          );
                        }
                      )}
                  </div>
                  <div className="mt-5 pt-4 d-flex justify-content-end">
                    <BackButton text="back" link="/credit-request" />
                  </div>
                </div>
              </div>

              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>

        <div className="layout-overlay layout-menu-toggle"></div>

        <div className="drag-target"></div>
      </div>
    </>
  );
}
import { GetServerSideProps } from "next";
import { ReadyState } from "react-use-websocket";
type Props = {};
export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "loanForm",
      "profile",
      "modal",
      "sidebarMenu",
      "profileMenu",
      "kycErrorMessage",
      "errorMessage",
      "addpaymentErrorMessage",
    ])),
  },
});
