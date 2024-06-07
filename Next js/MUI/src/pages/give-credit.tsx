import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import NavbarBanner from "@/components/layout/NavbarBanner";
import Sidebar from "@/components/SidebarLayout";
import CredTable from "@/components/Dashboard/CredTable";
import GiveCredApply from "@/components/Dashboard/GiveCredApply";
import CreditStatus from "@/components/Dashboard/CreditStatus";
import { useAuthUser } from "@/effects";
import { toast } from "react-toastify";
import { urls } from "@/common/apis/urls";
import { getStaticProps } from "../pages/index";
export { getStaticProps };

export default function GiveCreditScreen() {
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  const { creditSummary } = storeData;
  const router = useRouter();
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const refList = (useContext(appContext) as AppContext).refList;
  const [authUser] = useAuthUser();
  const { socketStatus, getCreditSummaryStatus, myProfile } = storeData;

  const getCreditSummary = async () => {
    setStoreData({ buttonLoading: true });
    const res = await apis.apiClient(
      urls.credit.LoanApplication + "summary/?role=lender"
    );
    if (res.statusCode === 200) {
      setStoreData({ [res?.["traceId"]]: "getCreditSummaryStatus" });
    } else {
      setStoreData({ buttonLoading: false });
      toast.error(res?.["message"]);
    }
  };

  useEffect(() => {
    if (socketStatus === 1) {
      getCreditSummary();
    }
  }, [socketStatus]);

  useEffect(() => {
    if (getCreditSummaryStatus?.["statusCode"] === 200) {
      setStoreData({ buttonLoading: false });
      setStoreData({
        creditSummary: getCreditSummaryStatus?.["data"],
      });
    } else if (getCreditSummaryStatus?.["statusCode"] !== 200) {
      setStoreData({ buttonLoading: false });
      toast.error(getCreditSummaryStatus?.["msg"]);
    }
    return () => {
      setStoreData({
        getCreditSummaryStatus: undefined,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCreditSummaryStatus]);

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar activeClass="anchor-dashboard" />
          <div className="layout-page">
            <NavbarBanner />
            <div className="content-wrapper mt-4 mb-4">
              <div className="container-xxl flex-grow-1">
                <div className="">
                  <div className="row">
                    <div className="col-xl-12 mb-4 col-lg-12 col-md-12 col-12 ">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title text-black mb-2">
                          Credit Status
                        </h5>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="credit-status">
                          <CreditStatus
                            title={{
                              name: "Total Credit Amount Disbursed",
                              value:
                                creditSummary?.loan_applications_total_approved,
                            }}
                            subtitle={{
                              name: "No. of Credit Applications",
                              value:
                                creditSummary?.loan_applications_count_approved,
                            }}
                          />
                        </div>
                        <div className="credit-status">
                          <CreditStatus
                            title={{
                              name: "Total Credit Amount Recovered",
                              value:
                                creditSummary?.loan_applications_total_full_paid,
                            }}
                            subtitle={{
                              name: "No. of Customers Financed",
                              value:
                                creditSummary?.number_of_customers_financed,
                            }}
                          />
                        </div>
                        <div className="credit-status">
                          <CreditStatus
                            title={{
                              name: "Defaulted Amount",
                              value:
                                creditSummary?.loan_applications_total_defaulted,
                            }}
                            subtitle={{
                              name: "No. of Default Applications",
                              value:
                                creditSummary?.loan_applications_count_defaulted,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-12 mb-4 col-lg-12 col-md-12 col-12 mt-4">
                      <GiveCredApply />
                      <CredTable
                        hydrated
                        query={{
                          role: "lender",
                        }}
                      />
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
