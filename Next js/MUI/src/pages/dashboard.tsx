import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import NavbarBanner from "@/components/layout/NavbarBanner";
import Sidebar from "@/components/SidebarLayout";
import CredTable from "@/components/Dashboard/CredTable";
import CredApply from "@/components/Dashboard/CredApply";
import Slider from "@/components/Dashboard/Slider";
import BusinessToggle from "@/components/Dashboard/BusinessToggle";
import OverDuePayment from "@/components/Dashboard/OverDuePayment";
import UpComingPayment from "@/components/Dashboard/UpComingPayment";
import SwitchScore from "@/components/Dashboard/SwitchScore";
import OutstandingBalance from "@/components/Dashboard/OutstandingBalance";
import Link from "next/link";

export default function Dashboard() {
  const [overDue, setOverDue] = useState({
    totalOverDueCount: 0,
    totalOverDueAmount: 0,
  });
  const [isOverDue, setIsOverDue] = useState(false);
  const [overduePaymentList, setOverduePaymentList] = useState([]);
  const [upcomingPaymentList, setUpcomingPaymentList] = useState([]);
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );

  const apis = (useContext(appContext) as AppContext).apis as Api;
  const [hydrated, setHydrated] = useState(false);
  const { socketStatus, getEMISchedulesStatus, myProfile } = storeData;
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (socketStatus === ReadyState.OPEN && !isOverDue) {
      setIsOverDue(true);
      getEMISchedules();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketStatus]);

  const getEMISchedules = async () => {
    setStoreData({ buttonLoading: true });
    const res = await apis.getEMISchedules({
      search: "",
      order_by: "id",
      size: "4",
      status: "pending",
    });
    if (res.statusCode === 200) {
      setStoreData({ [res?.["traceId"]]: "getEMISchedulesStatus" });
    } else {
      setStoreData({ buttonLoading: false });
    }
  };

  function isInTheFuture(date: any) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) < today;
  }
  const upcomingPayment = [];
  const overduePayment = [];

  useEffect(() => {
    if (getEMISchedulesStatus?.["statusCode"] === 200) {
      setStoreData({ buttonLoading: false });
      setStoreData({
        getEMISchedulesList: getEMISchedulesStatus?.["data"]?.results,
      });
      getEMISchedulesStatus?.["data"]?.results?.map((item, index) => {
        let isUpcoming = true;
        let isOverDue = true;
        const applicationType = item.loan_application?.application_type;
        const emiItem = { ...item };
        emiItem.application_number = item?.loan_application?.application_number;
        emiItem.application_id = item?.loan_application?.id;
        emiItem.description =
          applicationType === "micro"
            ? item?.purpose
            : item?.supplier?.business_name;
        if (
          isInTheFuture(emiItem?.due_date.slice(0, 10)) &&
          isOverDue &&
          emiItem?.status === "pending"
        ) {
          overduePayment.push(emiItem);
          isOverDue = false;
        } else if (
          isInTheFuture(emiItem?.due_date.slice(0, 10)) &&
          emiItem?.status === "pending"
        ) {
          overduePayment.push(emiItem);
        } else {
          if (isUpcoming && emiItem?.status === "pending") {
            upcomingPayment.push(emiItem);
            isUpcoming = false;
          }
        }
      });

      setUpcomingPaymentList(upcomingPayment);
      setOverduePaymentList(overduePayment);
      setOverDue({
        totalOverDueCount: overduePayment.length,
        totalOverDueAmount: overduePayment?.reduce((acc, obj) => {
          return acc + parseFloat(obj.amount);
        }, 0),
      });
    } else if (getEMISchedulesStatus?.["statusCode"] !== 200) {
      setStoreData({ buttonLoading: false });
    }
    return () => {
      setStoreData({
        getEMISchedulesStatus: undefined,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getEMISchedulesStatus]);

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar activeClass="dashboard" />
          <div className="layout-page">
            <NavbarBanner />
            <div className="content-wrapper mt-4 mb-4">
              <div className="container-xxl flex-grow-1">
                {myProfile && !myProfile?.has_business_profile && (
                  <div className="bg-white text-center p-5 kyc-verification rounded-2 mb-4">
                    <h1 className="complete_profile">Complete your Profile</h1>
                    <p className="">
                      Please complete your profile KYC and submit the required
                      documents to ensure your account is{" "}
                      <span className="text-success fw-bold">verified!</span>
                    </p>
                    <Link
                      href="/business-profile"
                      className=" verifybtnstyle d-flex align-items-center justify-content-center gap-2 btn btn-fill"
                    >
                      Verify Profile
                    </Link>
                  </div>
                )}
                {myProfile?.has_business_profile && !myProfile?.is_verified && (
                  <div className="bg-white text-center p-5 kyc-verification rounded-2 mb-4">
                    <h1 className="">Profile Under Review</h1>
                    <p className="">
                      Your profile verification is under review. We will contact
                      you if any further details are required!
                    </p>
                  </div>
                )}
                <div className="above-1400">
                  <div className="row">
                    <div className="col-xl-8 mb-4 col-lg-7 col-md-8 col-12">
                      <Slider />
                      <BusinessToggle />
                      <div className="row my-4">
                        <OutstandingBalance hydrated={hydrated} />
                        <SwitchScore />
                      </div>
                      <CredApply hydrated={hydrated} />
                      <CredTable hydrated={hydrated} />
                    </div>
                    <div className="col-xl-4 mb-4 col-lg-5 col-md-4 col-12 dash-right">
                      <div className="card p-3 h-100">
                        {upcomingPaymentList && (
                          <UpComingPayment
                            upcomingPaymentList={upcomingPaymentList}
                          />
                        )}
                        {overduePaymentList && (
                          <OverDuePayment
                            overduePaymentList={overduePaymentList}
                            overdue={overDue}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="below-1400">
                  <div className="row">
                    <div className="col-12">
                      <Slider />
                      <BusinessToggle />
                      <div className="row my-4">
                        <OutstandingBalance hydrated={hydrated} />
                        <SwitchScore />
                      </div>
                      <div className="mb-5">
                        <CredApply />
                        <CredTable query={{ role: "borrower" }} />
                      </div>
                      <div className="card p-3">
                        <div className="row justify-content-between">
                          {upcomingPaymentList && (
                            <UpComingPayment
                              upcomingPaymentList={upcomingPaymentList}
                            />
                          )}
                          {overduePaymentList && (
                            <OverDuePayment
                              overduePaymentList={overduePaymentList}
                              overdue={overDue}
                            />
                          )}
                        </div>
                      </div>
                    </div>
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

import { getStaticProps } from "../pages/index";
import { ReadyState } from "react-use-websocket";
export { getStaticProps };
