import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import validation, { resValidation } from "@/common/utils/validation";
import NavbarBanner from "@/components/layout/NavbarBanner";
import parse from "html-react-parser";
import Header from "@/components/layout/Header";
import SettingSidebar from "@/components/layout/settingSidebar";
import { useTranslation } from "react-i18next";
// import SidebarMenu from "@/components/layout/SidebarMenu";
// import SettingSidebar from "@/components/layout/settingSidebar";
// import Deactivate from "@/components/form/deactivateCheckbox";
// import { ProductModal } from "@/components/dialog/productModal";

export default function DeactivateAccount() {
  const { t } = useTranslation("common");
  const [modelToggle, setModelToggle] = useState(false);
  const router = useRouter();
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const refList = (useContext(appContext) as AppContext).refList;
  const handleOnSubmit = async () => {
    // * Validation START //
    const validationField = ["delAccount"];
    if (validation(storeData, validationField, setDataError, refList))
      return "";
    // * Validation END //
    setModelToggle(true);
  };
  const handelDeleteProduct = async (value?: boolean) => {
    if (value) {
      const getCsrf = await apis.getCsrf();
      setStoreData({ buttonLoading: true });
      // const res = await apis.delAccount();
      // if (res.statusCode === 200) {
      //     setTimeout(() => {
      //         window.location.replace("/login");
      //     }, 1000);
      //     setStoreData({ [res?.["traceId"]]: "delAccountStatus" });
      // } else {
      //     toast.error(res?.["msg"]);
      //     if (res?.error?.[0]?.message) {
      //         resValidation(
      //             res?.error?.[0]?.message,
      //             setDataError,
      //             refList
      //         );
      //     }
      // }
    }
    setModelToggle(false);
  };

  //   const handleOnSubmit = async () => {
  //     const validationField = ["delAccount"];
  //     if (validation(storeData, validationField, setDataError, refList)) return "";
  //     const res = await apis.delAccount({
  //         "id":storeData?.myProfile?.id
  //     },);
  //     if (res.statusCode === 200) {
  //       toast.error(res?.["msg"]);
  //         setStoreData({ [res?.["traceId"]]: "delAccountStatus" });
  //     } else {
  //         toast.error(res?.["msg"]);
  //         if (res?.error?.[0]?.message) {
  //             resValidation(res?.error?.[0]?.message, setDataError, refList);
  //         }
  //     }
  // };
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {/* <SidebarMenu activeClass="dashboard" /> */}
        <Sidebar activeClass="setting" />
        <div className="layout-page">
          <NavbarBanner />

          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <Header
                title={parse(
                  '<h5 className="head_form">Setting - Delete Account | <small>Delete Your Account.</small></h5>'
                )}
              />
              <div className="row">
                <SettingSidebar />
                <div className="col-xl-8 col-lg-7 col-md-7">
                  <h3 className="set_head"></h3>
                  <div className="card">
                    <div className="card-body">
                      <div className="list-group-item list-group-item-warning waring_box">
                        <span>
                          {" "}
                          {t("Are you sure you want to delete your account?")}
                        </span>
                        {t(
                          "Once you delete your account, you will not be able to access our services."
                        )}
                      </div>
                      <label className="list-group-item mt-3">
                        {/* <Deactivate /> */}
                      </label>
                      <button
                        onClick={() => handleOnSubmit()}
                        className="btn btn-red"
                      >
                        {t("Delete Account")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-backdrop fade"></div>
          </div>
        </div>

        <div className="layout-overlay layout-menu-toggle"></div>

        <div className="drag-target"></div>
      </div>
      {/* {ProductModal(
                modelToggle,
                "/images/delete_in.png",
                "Are you sure you want to delete this account ?",
                handelDeleteProduct
            )} */}
    </div>
  );
}
import { getStaticProps } from "../pages/index";
import Sidebar from "@/components/SidebarLayout";
export { getStaticProps };
