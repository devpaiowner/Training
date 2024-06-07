import CreditViewApplication from "@/components/layout/creditViewApplication";
import appContext, { AppContext } from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import HtmlParse from "html-react-parser";
import Api from "@/common/apis/apis";
import { useRouter } from "next/router";
import NavbarBanner from "@/components/layout/NavbarBanner";
import Sidebar from "@/components/SidebarLayout";
import BackButton from "@/components/Button/backButton";

export default function CreditApplication() {
  const [isFormView, setIsFormView] = useState(false);
  const refList = useContext(appContext).refList;
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation("loanForm");
  const { getLoanApplicationByIdStatus, socketStatus } = storeData;
  useEffect(() => {
    if (socketStatus === ReadyState.OPEN && !isFormView) {
      setIsFormView(true);
      getLoanApplicationById();
    }
    return () => {
      setStoreData({
        getLoanApplicationByIdStatus: undefined,
        business_name: "",
        business_address: "",
        director_name: "",
        email: "",
        mobile: "",
        repayment_method: "",
        principal: "",
        supplier_payment_method: "",
        account_name: "",
        account_number: "",

        bank_name: "",
        bank_branch_code: "",
        purpose: "",
        tenure: "",

        total_monthly_income: "",
        has_alternate_income_source: "",
        alternate_income_source_desc: "",
        has_other_finance_form: "",
        other_finance_form_desc: "",
        has_existing_loan: "",

        existing_loan_type: "",
        existing_loan_amount: "",
        supplier_account_name: "",
        supplier_account_number: "",
        supplier_bank_name: "",
        supplier_bank_branch_code: "",

        supplier_business_name: "",
        supplier_mobile: "",
        application_type: "",
        purpose_other: "",

        partner_full_name: "",
        partner_email: "",
        partner_mobile: "",

        trading_license: "",
        lease_agreement: "",
        title_deed: "",
        power_attorney: "",
        tbs: "",
        kycBoostFile6: "",

        inventoryLpo: "",
        inventoryLpoStore: "",
        tncAgree: false,
        multipleInvoiceList: [],
        payrollDoc1: "",
        payrollDoc2: "",
        payrollDoc3: "",
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketStatus]);

  const getLoanApplicationById = async () => {
    setStoreData({ buttonLoading: true });
    const res = await apis.getLoanApplicationById(id);
    if (res.statusCode === 200) {
      setStoreData({ [res?.["traceId"]]: "getLoanApplicationByIdStatus" });
    } else {
      setStoreData({ buttonLoading: false });
      toast.error(res?.["message"]);
    }
  };

  useEffect(() => {
    if (getLoanApplicationByIdStatus?.["statusCode"] === 200) {
      setStoreData({ buttonLoading: false });
      setStoreData({
        loanApplicationById: getLoanApplicationByIdStatus?.["data"],
      });
      const data = getLoanApplicationByIdStatus?.["data"];
      const payment_info = data?.applicant_payment_info;
      const partner = data?.loan_partners[0];
      setStoreData({
        repayment_method: data?.repayment_method,
        principal: data?.principal,
        // parterns
        partner_full_name: partner?.full_name,
        partner_email: partner?.email,
        partner_mobile: partner?.mobile,
        // applicant
        mobile: payment_info?.mobile,
        account_name: payment_info?.account_name,
        account_number: payment_info?.account_number,
        application_type: data?.application_type,
        bank_name: payment_info?.bank_name,
        bank_branch_code: payment_info?.bank_branch_code,
        // supplier
        supplier_business_name: data?.supplier?.business_name,
        supplier_address: data?.supplier?.address.properties?.street,
        supplier_director_name:
          `${data?.supplier?.first_name} ${data?.supplier?.last_name}`.trim(),
        supplier_email: data?.supplier?.email,
        supplier_mobile: data?.supplier?.mobile,
        // extra
        purpose: data?.purpose,
        tenure: data?.tenure,
        existing_loan_type: data?.existing_loan_type,
        existing_loan_amount: data?.existing_loan_amount,
        total_monthly_income: data?.total_monthly_income,
        has_alternate_income_source: data?.has_alternate_income_source
          ? "yes"
          : "no",
        alternate_income_source_desc: data?.alternate_income_source_desc,
        other_finance_form_desc: data?.other_finance_form_desc?.replaceAll(
          "_",
          " "
        ),
        has_other_finance_form: data?.has_other_finance_form ? "yes" : "no",
        has_existing_loan: data?.existing_loan_type ? "yes" : "no",
      });

      let supplier_payment_info = {};
      data.supplier_payment_info &&
        Object.keys(data.supplier_payment_info).map((key) => {
          supplier_payment_info[`supplier_${key}`] =
            data.supplier_payment_info[key];
        });

      let brand = [];
      if (data?.brands?.length > 0) {
        data?.brands?.map((item) => {
          let finalObj = {};
          if (item?.documents?.length > 0) {
            Object.assign(finalObj, { brandName: item?.name });
            item?.documents?.map((item) => {
              Object.assign(finalObj, {
                [item?.document_type]: item,
              });
              // documentsArray.push({[item?.title]:item?.url})
            });
          }
          brand.push(finalObj);
          // setStoreData({ [item?.title]: item?.url });
        });
      }
      setStoreData({ multipleInvoiceList: brand, ...supplier_payment_info });
      if (data?.documents?.length > 0) {
        data?.documents?.map((item) => {
          setStoreData({ [item?.document_type]: item });
        });
      }
    } else if (getLoanApplicationByIdStatus?.["statusCode"] !== 200) {
      setStoreData({ buttonLoading: false });
      toast.error(getLoanApplicationByIdStatus?.["msg"]);
    }

    return () => {
      setStoreData({
        getLoanApplicationByIdStatus: undefined,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLoanApplicationByIdStatus]);

  const goBack = () => {
    return router.back();
  };

  return (
    <Fragment>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />
          <div className="layout-page">
            <NavbarBanner />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card p-50">
                  <div className="ribon">
                    {storeData?.application_type === "revolving" ? (
                      <>{HtmlParse(t("revolving_more_than"))}</>
                    ) : (
                      <>{HtmlParse(t("micro_less_than"))}</>
                    )}
                  </div>
                  <h4 className="my-2 text-dblue">
                    {t("credit_request_application")}
                  </h4>
                  <p className="text-dblue">{t("review_and_ensure")}</p>
                  <div>
                    <form className="row mt-2">
                      <CreditViewApplication />
                    </form>
                  </div>
                  <div className="mt-5 pt-4 d-flex justify-content-end">
                    <BackButton text="back" onClick={goBack} />
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
    </Fragment>
  );
}
import { GetServerSideProps } from "next";
import { ReadyState } from "react-use-websocket";
type Props = {};
export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "loanForm",
      "profile",
      "modal",
      "sidebarMenu",
      "profileMenu",
      "kycErrorMessage",
      "errorMessage",
      "addpaymentErrorMessage",
    ])),
  },
});
