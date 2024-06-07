import React, { useEffect, useState } from "react";
import useStore, { IStore } from "@/common/zustand/store";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import LessCredit from "@/components/FormIcon/lessCredit";
import MoreCredit from "@/components/FormIcon/moreCredit";
import Sidebar from "@/components/SidebarLayout";
import RadioSelectionForm from "@/components/form/radioSelectionForm";
import NavbarBanner from "@/components/layout/NavbarBanner";
import MicroLineOfCredit from "@/components/layout/microLineOfCredit";
import RevolvingLineOfCredit from "@/components/layout/revolvingLineOfCredit";

export default function ApplyCredit() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));

  const { application_type: selection } = storeData;

  const handleOnSubmit = () => {
    if (storeData.application_type === "micro") {
      router.push("/micro-form");
    } else {
      router.push("/revolving-form");
    }
  };

  const handleChange = (applicationType: string) => {
    setStoreData({ application_type: applicationType });
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidebar activeClass="Apply of Credit" />
        <div className="layout-page">
          <NavbarBanner />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="card p-50">
                <h4 className="mb-4 text-center text-dblue">
                  {" "}
                  <strong>
                    <em>
                      {t("hi")}{" "}
                      {storeData?.myProfile?.first_name &&
                        storeData?.myProfile?.first_name}
                    </em>
                  </strong>
                  {t("how_much_financing_are_you_looking")}
                </h4>
                <div className="d-flex flex-wrap justify-content-center choose-credit">
                  <div className="credit">
                    <RadioSelectionForm
                      value="micro"
                      selection={selection}
                      handleChange={handleChange}
                      name="application_type"
                    />
                    <LessCredit />
                  </div>
                  <div className="credit">
                    <RadioSelectionForm
                      value="revolving"
                      selection={selection}
                      handleChange={handleChange}
                      name="application_type"
                    />
                    <MoreCredit />
                  </div>
                </div>
                {selection === "micro" ? (
                  <MicroLineOfCredit />
                ) : (
                  <RevolvingLineOfCredit />
                )}
                <div className="text-end mt-5">
                  <button onClick={handleOnSubmit} className="btn btn-fill">
                    {t("let_start")}
                  </button>
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
  );
}
import { getStaticProps } from "../pages/index";
export { getStaticProps };
