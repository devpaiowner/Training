import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import validation, { resValidation } from "@/common/utils/validation";
import NavbarBanner from "@/components/layout/NavbarBanner";
import Sidebar from "@/components/SidebarLayout";
import parse from "html-react-parser";
import Header from "@/components/layout/Header";
import SettingSidebar from "@/components/layout/settingSidebar";
import InputForm from "@/components/form/inputForm";
import Button from "@/components/form/button";
import { useTranslation } from "react-i18next";
import { getStaticProps } from "../pages/index";

export default function Setting() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const apis = (useContext(appContext) as AppContext).apis as Api;
  const refList = (useContext(appContext) as AppContext).refList;
  const { storeData, setStoreData, setDataError, setNewError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
      setNewError: state.setNewError,
    })
  );

  useEffect(() => {
    if (
      storeData.changePasswordStatus !== undefined &&
      storeData.changePasswordStatus?.["statusCode"] === 200
    ) {
    } else if (
      storeData.changePasswordStatus !== undefined &&
      storeData.changePasswordStatus?.["statusCode"] !== 200
    ) {
      toast.error(storeData.changePasswordStatus?.["msg"]);
    }

    return () => {
      setStoreData({
        changePasswordStatus: undefined,
        buttonLoading: false,
      });
    };
  }, [storeData.changePasswordStatus]);

  const handleOnSubmit = async (event: any) => {
    // * Validation START //
    const validationField = [
      "current_password",
      "new_password",
      "confirm_password",
    ];

    if (validation(storeData, validationField, setDataError, refList))
      return "";
    // * Validation END //

    setStoreData({ buttonLoading: true });
    const res = await apis.changePassword({
      ...storeData,
    });

    if (res.statusCode === 200) {
      toast.success("Your password changed sucessfully.");
      setTimeout(() => {
        window.location.replace("/login");
      }, 1000);
      setStoreData({ [res?.["traceId"]]: "changePasswordStatus" });
    } else {
      setStoreData({ buttonLoading: false });
      toast.error(res?.["message"]);
      if (res?.error?.[0]?.message) {
        resValidation(res?.error?.[0]?.message, setNewError, refList);
      }
    }
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidebar activeClass="setting" />
        <div className="layout-page">
          <NavbarBanner />

          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <Header
                title={parse(
                  '<h5 className="head_form">Setting - Change Password | <small>Change your Password.</small></h5>'
                )}
              />
              <div className="row">
                <SettingSidebar />
                <div className="col-xl-8 col-lg-7 col-md-7">
                  <h3 className="set_head">{t("change_password")}</h3>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <label>{t("current_password")}</label>
                          <div className="form-group form_box">
                            <InputForm
                              name="current_password"
                              type="password"
                              class="form-control"
                              onChange={() => {}}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <label>{t("new_password")}</label>
                          <div className="form-group form_box">
                            <InputForm
                              name="new_password"
                              type="password"
                              class="form-control"
                              onChange={() => {}}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <label>{t("confirm_password")}</label>
                          <div className="form-group form_box">
                            <InputForm
                              name="confirm_password"
                              type="password"
                              class="form-control"
                              onChange={() => {}}
                            />
                          </div>
                        </div>
                        <div className="col-md-12 text-center">
                          <Button
                            text={"Save"}
                            handleOnSubmit={handleOnSubmit}
                          />
                        </div>
                      </div>
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
    </div>
  );
}
export { getStaticProps };
