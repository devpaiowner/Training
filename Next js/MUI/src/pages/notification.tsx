import React, { useEffect, useContext, useState } from "react";

import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import NavbarBanner from "@/components/layout/NavbarBanner";
// import SidebarMenu from "@/components/layout/SidebarMenu";
import SettingSidebar from "@/components/layout/settingSidebar";
import Sidebar from "@/components/SidebarLayout";

export default function Notification() {
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  const apis = (useContext(appContext) as AppContext).apis as Api;

  const [status, setStatus] = useState(false);

  const GetNotification = async () => {
    // const res = await apis.getNotification({ status: false });
    // if (res.statusCode === 200) {
    //     setStoreData({ [res?.["traceId"]]: "notificationStatus" });
    // } else {
    //     // setStoreData({ buttonLoading: false });
    //     //   toast.error(res?.["message"]);
    // }
  };

  useEffect(() => {
    if (
      storeData.notificationStatus !== undefined &&
      storeData.notificationStatus?.["statusCode"] === 200
    ) {
      setStoreData({
        notificationList: storeData.notificationStatus?.["data"]?.notifications,
      });
    } else if (
      storeData.notificationStatus !== undefined &&
      storeData.notificationStatus?.["statusCode"] !== 200
    )
      return () => {
        setStoreData({
          notificationStatus: undefined,
        });
      };
  }, [storeData.notificationStatus]);

  useEffect(() => {
    Object.keys(storeData?.webSocket ?? {})?.map((item) => {
      if (item === "common" && storeData?.webSocket[item] === 1) {
        GetNotification();
      }
    });
  }, [status]);

  const handleReadAll = async () => {
    // let ids = storeData?.notificationList?.map((item) => {
    //     return item?.id;
    // });
    // const res = await apis.ReadAllNotification({ ids });
    // if (res.statusCode === 200) {
    //     setStatus(true);
    //     setStoreData({ [res?.["traceId"]]: "notificationStatus" });
    // } else {
    //     // setStoreData({ buttonLoading: false });
    //     //   toast.error(res?.["message"]);
    // }
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {/* <SidebarMenu activeClass="dashboard" /> */}
        <Sidebar activeClass="setting" />
        <div className="layout-page">
          <NavbarBanner />

          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <SettingSidebar />
                <div className="col-xl-8 col-lg-7 col-md-7">
                  <div className="d-flex justify-content-between">
                    <h3 className="set_head">{/* {t("notification")} */}</h3>
                    <span
                      onClick={() => handleReadAll()}
                      className="align-items-end link-pointer"
                    >
                      {/* <b>{t("markAllRead")}</b> */}
                    </span>
                  </div>

                  <div className="card mb-4">
                    <div className="card-body pe-0 ps-0 pt-1 pb-1">
                      <ul className="list-group list-group-flush notification-list">
                        {storeData?.notificationList?.map((item, index) => {
                          return (
                            <li
                              key={index}
                              className="list-group-item list-group-item-action
                              dropdown-notifications-item"
                            >
                              <div className="d-flex">
                                <div className="flex-shrink-0 me-3">
                                  <div className="avatar">
                                    <img
                                      src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/5.png`}
                                      className="rounded-circle"
                                    />
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <h6 className="mb-1">{item?.subject}</h6>
                                  <p className="mb-0">{item?.body}</p>
                                </div>
                                <div className="align-items-end">
                                  <small className="text-muted">
                                    12 min ago
                                  </small>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
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
