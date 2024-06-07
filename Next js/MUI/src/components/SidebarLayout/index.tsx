/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookie from "js-cookie";
import useStore, { IStore } from "@/common/zustand/store";
import { useTranslation } from "react-i18next";

interface IProps {
  activeClass?: string;
  handleMenu?: Function;
  toggle?: boolean;
}

const Sidebar = (props: IProps) => {
  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (!["pending", "pending"].includes(Cookie.get("isKyc"))) {
      setHydrated(true);
    }
  }, []);
  const { t } = useTranslation("sidebarMenu");
  const [isSwitchCred, setIsSwitchCred] = useState(true);
  const [othersToggle, setothersToggle] = useState(false);
  const othersTogglehandleClick = () => {
    setothersToggle(!othersToggle);
  };

  const [giveCreditToggle, setgiveCreditToggle] = useState(false);
  const giveCreditTogglehandleClick = () => {
    setgiveCreditToggle(!giveCreditToggle);
  };
  const [getCreditToggle, setgetCreditToggle] = useState(false);
  const getCreditTogglehandleClick = () => {
    setgetCreditToggle(!getCreditToggle);
  };
  const [purchaseToggle, setpurchaseToggle] = useState(false);
  const purchaseTogglehandleClick = () => {
    setpurchaseToggle(!purchaseToggle);
  };
  const [salesToggle, setsalesToggle] = useState(false);
  const salesTogglehandleClick = () => {
    setsalesToggle(!salesToggle);
  };
  const [partiesToggle, setpartiesToggle] = useState(false);
  const partiesTogglehandleClick = () => {
    setpartiesToggle(!partiesToggle);
  };
  const [manageToggle, setmanageToggle] = useState(false);
  const manageTogglehandleClick = () => {
    setmanageToggle(!manageToggle);
  };

  useEffect(() => {
    if (!isSwitchCred) {
      window.location.href = "/anchor-partner/";
    }
  }, [isSwitchCred]);

  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme dark-mode-menu"
    >
      <div
        className="app-brand demo 
    justify-content-between
"
      >
        {!sideBarToggle && (
          <span className="app-brand-link">
            <span className="app-brand-text demo menu-text fw-bold m-0">
              <Link href="#">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/logo-icon.svg`}
                  alt=""
                />
                <span className="ms-2 site-name">Switch Cred</span>
              </Link>
            </span>
          </span>
        )}

        <span>
          <input
            type="checkbox"
            className="switch-input"
            id="switchtoggalcread"
            checked={isSwitchCred}
            onClick={(e) => setIsSwitchCred(!isSwitchCred)}
          />
          <label className="switch mx-2" htmlFor="switchtoggalcread">
            <span className="switch-toggle-slider">
              <span className="switch-on-off"></span>
            </span>
          </label>
        </span>
      </div>
      <div className="menu-inner-shadow"></div>
      <ul className="menu-inner py-1">
        {props?.activeClass === "Profile Setup" ? (
          <li className={"menu-item active"}>
            <Link href="#" className="menu-link">
              {t("profile_setup")}
            </Link>
          </li>
        ) : (
          <>
            <li
              className={
                getCreditToggle ? "menu-item active open" : "menu-item"
              }
            >
              <span
                onClick={() => getCreditTogglehandleClick()}
                className="menu-link menu-toggle link-pointer"
              >
                <div data-i18n="Layouts">Get Credit</div>
              </span>

              <ul className="menu-sub">
                <li className="menu-item">
                  <Link href="/" className="menu-link">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/dashboard.png`}
                      alt=""
                      className="me-2"
                    />
                    {t("Dashboard")}
                  </Link>
                </li>
                <li className="menu-item">
                  <Link href="/apply-credit" className="menu-link">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/applycredit.svg`}
                      alt=""
                      className="me-2"
                    />
                    {t("Apply for credit")}
                  </Link>
                </li>
                <li className="menu-item">
                  <Link href="/loan-application" className="menu-link">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/myapplication.svg`}
                      alt=""
                      className="me-2"
                    />
                    {t("My Applications")}
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={
                giveCreditToggle ? "menu-item active open" : "menu-item"
              }
            >
              <span
                onClick={() => giveCreditTogglehandleClick()}
                className="menu-link menu-toggle link-pointer"
              >
                <div data-i18n="Layouts">Give Credit</div>
              </span>

              <ul className="menu-sub">
                <li className="menu-item">
                  <Link href="/give-credit" className="menu-link">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/dashboard.png`}
                      alt=""
                      className="me-2"
                    />
                    {t("Dashboard")}
                  </Link>
                </li>
                <li className="menu-item">
                  <Link href="/credit-request/" className="menu-link">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/creditcontrol.svg`}
                      alt=""
                      className="me-2"
                    />



                    {t("Credit Requests")}
                  </Link>
                </li>
              </ul>
            </li>

            <li
              className={othersToggle ? "menu-item active open" : "menu-item"}
            >
              <span
                onClick={() => othersTogglehandleClick()}
                className="menu-link menu-toggle link-pointer"
              >
                <div data-i18n="Layouts">others</div>
              </span>

              <ul className="menu-sub">
                <li className="menu-item">
                  <Link href="#" className="menu-link">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/staff.svg`}
                      alt=""
                      className="me-2"
                    />
                    {t("Staff")}
                  </Link>
                </li>
                <li className="menu-item">
                  <Link href="#" className="menu-link">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/profilesetting.svg`}
                      alt=""
                      className="me-2"
                    />
                    {t("Profile Settings")}
                  </Link>
                </li>
                <li className="menu-item">
                  <Link href="#" className="menu-link">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/security.svg`}
                      alt=""
                      className="me-2"
                    />
                    {t("Privacy and Security")}
                  </Link>
                </li>
              </ul>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
