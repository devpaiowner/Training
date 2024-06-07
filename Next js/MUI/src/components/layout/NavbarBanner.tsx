/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import { useTranslation } from "react-i18next";
import useStore, { IStore } from "@/common/zustand/store";

export default function NavbarBanner(props: any) {
  const { t } = useTranslation("common");
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  const { myProfile } = storeData;

  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <Link className="nav-item nav-link px-0 me-xl-4" href="#">
          <i className="ti ti-menu-2 ti-sm"></i>
        </Link>
      </div>

      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        <div className="navbar-nav align-items-center">
          <div className="nav-item navbar-search-wrapper mb-0 ms-0 d-flex align-items-center">
            {myProfile?.is_verified && (
              <span className="Verification-text">
                <img src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/check.png`} alt="" /> Profile
                Verified
              </span>
            )}
            <span className="d-none d-md-inline-block text-success ms-2"></span>
          </div>
        </div>

        <ul className="navbar-nav flex-row align-items-center ms-auto">
          {/* <LanguageMenu /> */}

          {/* <li className="nav-item  me-2 me-xl-0">
                        <Link className="nav-link" href="/app-chat">
                            <img
                                src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/chating.png`}
                                alt=""
                            />
                        </Link>
                    </li>

                    <li
                        className="nav-item me-2 me-xl-0"
                        onClick={() => {
                            Cookie.get("theme") === "dark"
                                ? Cookie.set("theme", "light")
                                : Cookie.set("theme", "dark");
                            window.location.reload();
                        }}
                    >
                        <Theme />
                    </li>

                    <li className="nav-item  me-2 me-xl-0">
                        <div className="navbar-nav align-items-center">
                            <div className="nav-item navbar-search-wrapper mb-0">
                                <Link
                                    className="nav-item nav-link search-toggler d-flex align-items-center px-0"
                                    href="#"
                                >
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/search.png`}
                                        alt=""
                                    />
                                </Link>
                            </div>
                        </div>
                    </li>

                    <Notification /> */}

          <ProfileMenu />
        </ul>
      </div>

      {/* <div className="navbar-search-wrapper search-input-wrapper d-none">
                <input
                    type="text"
                    className="form-control search-input container-xxl border-0"
                    placeholder="Search..."
                    aria-label="Search..."
                />
                <i className="ti ti-x ti-sm search-toggler cursor-pointer"></i>
            </div> */}
    </nav>
  );
}
