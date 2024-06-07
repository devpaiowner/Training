/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import useStore, { IStore } from "@/common/zustand/store";
import NavbarBanner from "@/components/layout/NavbarBanner";
import Sidebar from "@/components/SidebarLayout";
import Header from "@/components/layout/Header";
import { amountPayablecal } from "@/common/commonMethod";
import CredTable from "@/components/Dashboard/CredTable";

export default function PaymentListing() {
  const [page, setPage] = useState(1);
  const [checked, setChecked] = useState([]);
  const { t } = useTranslation("common");
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  const { loanApplications } = storeData;
  const [searchQuery, setSearchQuery] = useState({});

  useEffect(() => {
    setSearchQuery({ role: "borrower" });
  }, []);

  const handleSearch = async () => {
    setSearchQuery({
      role: "borrower",
      search: storeData?.searchData,
      due_date: storeData?.searchDate,
      status: storeData?.searchStatus,
      page: page,
    });
  };

  // download
  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const handleDownload = () => {
    if (checked?.length > 0) {
      let headers = [
        "Application ID,Application Type,Description,Amount,Amount Payble,Net Term,Amount Paid,Amount Due",
      ];

      const data = loanApplications?.filter((item) => {
        return checked.includes(item?.id);
      });

      let usersCsv = data.reduce((acc, user) => {
        const amountPay = amountPayablecal(user);
        const amountPaid = handlePaidAmount(user?.payments);
        const revolving = user?.supplier?.business_name;
        const {
          application_number,
          application_type,
          purpose,
          amount,
          tenure,
          amount_currency,
        } = user;
        acc.push(
          [
            application_number,
            application_type === "micro"
              ? t("micro_line_of_credit")
              : t("revolving_line_of_credit"),
            application_type === "micro" ? purpose : revolving,
            `${amount_currency}  ${amount}`,
            `${amount_currency}  ${amountPay}`,
            tenure + " days",
            amountPaid,
            amountPay - amountPaid,
          ].join(",")
        );
        return acc;
      }, []);

      downloadFile({
        data: [...headers, ...usersCsv].join("\n"),
        fileName: "payment summary.csv",
        fileType: "text/csv",
      });
    }
  };

  const handlePaidAmount = (payment: any) => {
    const amount =
      payment?.length > 0
        ? payment?.reduce((acc, obj) => {
            if (obj.status === "approved") {
              return acc + parseFloat(obj.amount);
            }
            return acc;
          }, 0)
        : 0;
    return amount;
  };

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar activeClass="payment" />
          <div className="layout-page">
            <NavbarBanner />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <Header
                  title={parse(
                    `<h5 className="head_form">${t(
                      "credit_applications"
                    )} | <small>${t(
                      "manage_your_loan_applications"
                    )}</small></h5>`
                  )}
                  filter={true}
                  search={true}
                  searchPlaceholder={t("search_by_applicationid_description")}
                  date={true}
                  status
                  searchButton={true}
                  downloadButton={true}
                  handleSearch={handleSearch}
                  handleDownload={handleDownload}
                  options={[
                    { value: "", text: t("all") },
                    { value: "update_required", text: t("update_required") },
                    { value: "approved", text: t("approved") },
                    { value: "rejected", text: t("rejected") },
                    { value: "disbursed", text: t("disbursed") },
                    {
                      value: "disbursement_pending",
                      text: t("disbursement_pending"),
                    },
                    { value: "pending", text: t("pending") },
                    { value: "pending", text: t("pending") },
                  ]}
                />
                <CredTable
                  query={!searchQuery ? { role: "borrower" } : searchQuery}
                />
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
type Props = {};
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "loanForm",
      "profile",
      "modal",
      "sidebarMenu",
      "profileMenu",
      "kycErrorMessage",
      "addpaymentErrorMessage",
    ])),
  },
});
