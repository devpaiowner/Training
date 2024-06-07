/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { TbLogout } from "react-icons/tb";
import { BiHelpCircle } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { FiUserCheck } from "react-icons/fi";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import useStore, { IStore } from "@/common/zustand/store";
import { getStaticProps } from "../../pages/index";
export { getStaticProps };
import { CiSettings } from "react-icons/ci";
import { useAuthUser } from "@/effects";

export default function ProfileMenu() {
  const [showDrodown, setShowDrodown] = useState<Boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [authUser, setAuthUser] = useAuthUser();
  const router = useRouter();

  const { t } = useTranslation("profileMenu");
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  const { myProfile, avatar } = storeData;

  const logout = () => {
    removeCookie("token");
    removeCookie("userRole");
    document.location.href = "/login";
  };

  return (
    <li className="nav-item navbar-dropdown dropdown-user dropdown">
      <span
        onClick={() => setShowDrodown(!showDrodown)}
        className="nav-link dropdown-toggle
                    hide-arrow link-pointer"
        data-bs-toggle="dropdown"
      >
        <div className="d-flex">
          <div className="flex-shrink-0 me-3 text-end">
            <span className="fw-semibold d-block text-black">
              {authUser &&
                t("hi") +
                  " " +
                  `${myProfile?.full_name || authUser?.full_name || ""}`.trim()}
            </span>
            <small className="text-muted">
              {myProfile?.business_name || authUser?.business_name}
            </small>
          </div>
          <div className="flex-grow-1">
            <div className="avatar avatar-online">
              <img
                src={
                  avatar
                    ? avatar?.file || avatar
                    : `${process.env.NEXT_PUBLIC_BASEPATH}/images/profile.png`
                }
                className="rounded-circle"
                alt=""
              />
            </div>
          </div>
        </div>
      </span>
      <ul
        className={
          showDrodown
            ? "dropdown-menu dropdown-menu-end show"
            : "dropdown-menu dropdown-menu-end"
        }
        data-bs-popper={showDrodown && "static"}
      >
        <li>
          <Link className="dropdown-item" href="/profile">
            <FiUserCheck size={20} style={{ marginRight: "10px" }} />
            <span className="align-middle">{t("my_profile")}</span>
          </Link>
        </li>
        <li>
          <div className="dropdown-divider"></div>
        </li>
        <li>
          <span role="button" className="dropdown-item " onClick={logout}>
            <TbLogout size={20} style={{ marginRight: "10px" }} />
            <span className="align-middle">{t("logout")}</span>
          </span>
        </li>
      </ul>
    </li>
  );
}
