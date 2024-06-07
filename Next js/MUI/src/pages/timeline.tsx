/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useContext, useState } from "react";

import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import Sidebar from "@/components/SidebarLayout";
import NavbarBanner from "@/components/layout/NavbarBanner";
import parse from "html-react-parser";
import Header from "@/components/layout/Header";
import SettingSidebar from "@/components/layout/settingSidebar";

export default function Timeline() {
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  const apis = (useContext(appContext) as AppContext).apis as Api;

  const GetNotification = async () => {
    // const res = await apis.getNotification({ status: true });
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
  }, []);

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
                  '<h5 className="head_form">Setting - Setting - Timeline | <small>Setting - Timeline.</small></h5>'
                )}
              />
              <div className="row">
                <SettingSidebar />
                <div className="col-xl-9 col-lg-8 col-md-8">
                  <div className="card mb-4">
                    <div className="card-body pb-0">
                      <ul className="timeline mb-0">
                        <li className="timeline-item timeline-item-transparent">
                          <span className="timeline-point timeline-point-primary"></span>
                          <div className="timeline-event">
                            <div className="timeline-header mb-1">
                              <h6 className="mb-0">
                                12 Invoices have been paid
                              </h6>
                              <small className="text-muted">12 min ago</small>
                            </div>
                            <p className="mb-2">
                              Invoices have been paid to the company
                            </p>
                            <div className="d-flex">
                              <a href="#" className="me-3">
                                <img
                                  src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/icons/misc/pdf.png`}
                                  alt="PDF image"
                                  width="15"
                                  className="me-2"
                                />
                                <span className="fw-semibold  invoice_pdf">
                                  invoices.pdf
                                </span>
                              </a>
                            </div>
                          </div>
                        </li>
                        <li className="timeline-item timeline-item-transparent">
                          <span className="timeline-point timeline-point-warning"></span>
                          <div className="timeline-event">
                            <div className="timeline-header mb-1">
                              <h6 className="mb-0">Client Meeting</h6>
                              <small className="text-muted">45 min ago</small>
                            </div>
                            <p className="mb-2">
                              Project meeting with john @10:15am
                            </p>
                            <div className="d-flex flex-wrap">
                              <div className="avatar me-3">
                                <img
                                  src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/3.png`}
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div>
                                <h6 className="mb-0">
                                  Lester McCarthy (Client)
                                </h6>
                                <small>CEO of Pixinvent</small>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="timeline-item timeline-item-transparent">
                          <span className="timeline-point timeline-point-info"></span>
                          <div className="timeline-event">
                            <div className="timeline-header mb-1">
                              <h6 className="mb-0">Client Meeting</h6>
                              <small className="text-muted">45 min ago</small>
                            </div>
                            <p className="mb-2">
                              Project meeting with john @10:15am
                            </p>
                            <div className="d-flex flex-wrap">
                              <div className="avatar me-3">
                                <img
                                  src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/3.png`}
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div>
                                <h6 className="mb-0">
                                  Lester McCarthy (Client)
                                </h6>
                                <small>CEO of Pixinvent</small>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="timeline-item timeline-item-transparent">
                          <span className="timeline-point timeline-point-success"></span>
                          <div className="timeline-event">
                            <div className="timeline-header mb-1">
                              <h6 className="mb-0">Design Review</h6>
                              <small className="text-muted">5 days Ago</small>
                            </div>
                            <p className="mb-0">
                              Weekly review of freshly prepared design for our
                              new app.
                            </p>
                          </div>
                        </li>
                        <li className="timeline-item timeline-item-transparent">
                          <span className="timeline-point timeline-point-primary"></span>
                          <div className="timeline-event">
                            <div className="timeline-header mb-1">
                              <h6 className="mb-0">
                                12 Invoices have been paid
                              </h6>
                              <small className="text-muted">12 min ago</small>
                            </div>
                            <p className="mb-2">
                              Invoices have been paid to the company
                            </p>
                            <div className="d-flex">
                              <a href="#" className="me-3">
                                <img
                                  src={`${process.env.NEXT_PUBLIC_BASEPATH}/images//icons/misc/pdf.png`}
                                  alt="PDF image"
                                  width="15"
                                  className="me-2"
                                />
                                <span className="fw-semibold  invoice_pdf">
                                  invoices.pdf
                                </span>
                              </a>
                            </div>
                          </div>
                        </li>
                        <li className="timeline-item timeline-item-transparent">
                          <span className="timeline-point timeline-point-warning"></span>
                          <div className="timeline-event">
                            <div className="timeline-header mb-1">
                              <h6 className="mb-0">Client Meeting</h6>
                              <small className="text-muted">45 min ago</small>
                            </div>
                            <p className="mb-2">
                              Project meeting with john @10:15am
                            </p>
                            <div className="d-flex flex-wrap">
                              <div className="avatar me-3">
                                <img
                                  src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/3.png`}
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div>
                                <h6 className="mb-0">
                                  Lester McCarthy (Client)
                                </h6>
                                <small>CEO of Pixinvent</small>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="timeline-item timeline-item-transparent">
                          <span className="timeline-point timeline-point-info"></span>
                          <div className="timeline-event">
                            <div className="timeline-header mb-1">
                              <h6 className="mb-0">Client Meeting</h6>
                              <small className="text-muted">45 min ago</small>
                            </div>
                            <p className="mb-2">
                              Project meeting with john @10:15am
                            </p>
                            <div className="d-flex flex-wrap">
                              <div className="avatar me-3">
                                <img
                                  src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/3.png`}
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div>
                                <h6 className="mb-0">
                                  Lester McCarthy (Client)
                                </h6>
                                <small>CEO of Pixinvent</small>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="timeline-item timeline-item-transparent border-0">
                          <span className="timeline-point timeline-point-success"></span>
                          <div className="timeline-event">
                            <div className="timeline-header mb-1">
                              <h6 className="mb-0">Design Review</h6>
                              <small className="text-muted">5 days Ago</small>
                            </div>
                            <p className="mb-0">
                              Weekly review of freshly prepared design for our
                              new app.
                            </p>
                          </div>
                        </li>
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
import { getStaticProps } from "../pages/index";
export { getStaticProps };
