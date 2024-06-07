import Link from "next/link";
import React, { useEffect, useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { LogoutModalBox } from "../modalBox/logoutBox";
// import { LogoutModalBox } from "@/components/dialog/logoutBox";

export default function SettingSidebar() {
  const [toggle, setToogle] = useState<boolean>();

  const rounter = useRouter();

  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  const [modelToggle, setModelToggle] = useState(false);
  const apis = (useContext(appContext) as AppContext).apis as Api;

  const handleLogout = async (value?: boolean) => {
    if (value) {
      const res = await apis.logout({});
      if (res.statusCode === 200) {
        window.location.replace("/login");
        // rounter.push("/login");
        setStoreData({ [res?.["traceId"]]: "logoutStatus" });
      } else {
        setStoreData({ buttonLoading: false });
        toast.error(res?.["message"]);
      }
    }
    setModelToggle(false);
  };

  const handelLogoutModal = async () => {
    setModelToggle(true);
  };

  const handleNotification = async () => {
    const res = await apis.updateNotification({
      status: !toggle,
    });
    if (res.statusCode === 200) {
      toast.success("Notificaton status changed.");
      setStoreData({ [res?.["traceId"]]: "updateNotificationStatus" });
    } else {
      setStoreData({ buttonLoading: false });
      toast.error(res?.["message"]);
    }
    setToogle(!toggle);
  };

  return (
    <>
      <div className="col-xl-3 col-lg-4 col-md-4 Settings-sidebar">
        <div className="card">
          <div className="user_details_sec card-body">
            <div className="profile_img">
              <img
                src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/profile.png`}
                alt=""
              />
              <h4 className="user_name">
                {storeData?.myProfile &&
                  storeData?.myProfile?.first_name +
                    " " +
                    storeData?.myProfile?.last_name}
              </h4>
            </div>
          </div>
          <hr />
          <div className="card-body user_information ">
            <ul className="list-unstyled mb-4">
              {/* <li className="d-flex align-items-center mb-3">
                                <Link
                                    href="/timeline"
                                    className="f_name fw-bold"
                                >
                                    <span className="btn_icon_left">
                                        {" "}
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/timeline.png`}
                                            alt=""
                                        />
                                    </span>{" "}
                                    Timeline
                                </Link>
                            </li> */}
              {/* <li className="d-flex align-items-center justify-content-between mb-3">
                                <Link
                                    href="/notification"
                                    className="f_name fw-bold"
                                >
                                    <span className="btn_icon_left">
                                        {" "}
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/notification.png`}
                                            alt=""
                                        />
                                    </span>{" "}
                                    Notification
                                </Link>
                                <label className="switch mx-4">
                                    <input
                                        name="notification_enabled"
                                        type="checkbox"
                                        className="switch-input"
                                        checked={toggle ? true : false}
                                        onClick={() => {
                                            handleNotification();
                                        }}
                                    />
                                    <span className="switch-toggle-slider">
                                        <span className="switch-on"></span>
                                        <span className="switch-off"></span>
                                    </span>
                                </label>
                            </li> */}

              <li className="d-flex align-items-center mb-3">
                <Link href="/setting" className="f_name fw-bold">
                  <span className="btn_icon_left">
                    {" "}
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/lock.png`}
                      alt=""
                    />
                  </span>{" "}
                  Change Password
                </Link>
              </li>
              {/* <li className="d-flex align-items-center mb-3">
                                <Link
                                    href="/deactivate-account"
                                    className="f_name fw-bold"
                                >
                                    <span className="btn_icon_left">
                                        {" "}
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/delete-account.png`}
                                            alt=""
                                        />
                                    </span>{" "}
                                    Delete Account
                                </Link>
                            </li> */}
              <li className="text-center logout_btn">
                <button
                  className="btn btn-blue logout_btn"
                  data-bs-toggle="modal"
                  data-bs-target="#logout_modal"
                  onClick={() => handelLogoutModal()}
                >
                  {" "}
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        {LogoutModalBox(
          modelToggle,
          "/images/logout.png",
          "Are you sure you want to log out?",
          handleLogout
        )}
      </div>
    </>
  );
}
