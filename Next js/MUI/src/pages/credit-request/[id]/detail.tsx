import appContext, { AppContext } from "@/common/context/appContext";
import useStore, { IStore } from "@/common/zustand/store";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import moment from "moment";
import Api from "@/common/apis/apis";
import { useRouter } from "next/router";
import NavbarBanner from "@/components/layout/NavbarBanner";
import Sidebar from "@/components/SidebarLayout";
import MoneyInput from "@/components/form/MoneyInput";
import Link from "next/link";

export default function CreditDetail() {
  interface IFormInputs {
    grn_document: any;
  }
  const schema = yup.object().shape({
    grn_document: yup.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema) as any,
  });
  const refList = useContext(appContext).refList;
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const { t } = useTranslation("common");
  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));
  const router = useRouter();
  const { id } = router.query;
  const { getLoanApplicationByIdStatus, socketStatus, loanApplicationById } =
    storeData;

  useEffect(() => {
    if (socketStatus === ReadyState.OPEN) {
      getLoanApplicationById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketStatus]);

  const addDocuments = async (documents: Array<any>) => {
    const id = loanApplicationById?.id;
    const res = await apis.apiClient(
      urls.base_url + urls.credit.LoanApplication + id + "/add_documents/",
      {
        method: "POST",
        body: JSON.stringify({ documents }),
      }
    );
    if (res.id) {
      toast.success(t("Your GRN was submitted successfully"));
    }
    return res;
  };

  const getLoanApplicationById = async (search?: any) => {
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
        grn_document: getLoanApplicationByIdStatus?.["data"]?.grn_document,
      });
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

  const status = (status) => {
    let classN = "",
      text = "";
    switch (status) {
      case "pending":
        classN = "bg-warning";
        text = t("pending");
        break;
      case "approved":
        classN = "bg-success";
        text = t("approved");
        break;
      case "documents_missing":
        classN = "bg-dark";
        text = t("update_required");
        break;
      case "disbursement_pending":
        classN = "bg-grey";
        text = t("disbursement_pending");
        break;
      case "disbursed":
        classN = "bg-blue";
        text = t("disbursed");
        break;
      case "rejected":
        classN = "bg-danger";
        text = t("rejected");
        break;

      default:
        break;
    }
    return <span className={classN}>{text}</span>;
  };

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />

          <div className="layout-page">
            <NavbarBanner />

            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card-header mb-3">
                  <h5 className="head_form">
                    {loanApplicationById?.application_number} |{" "}
                    <small>
                      {loanApplicationById?.application_type === "micro"
                        ? t("micro_line_of_credit")
                        : t("revolving_line_of_credit")}
                    </small>
                  </h5>
                </div>

                <div className="card cred-detail p-4">
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <p className="d-flex">
                        <strong className="me-1">Application ID:</strong>{" "}
                        <span>{loanApplicationById?.application_number}</span>
                      </p>
                      <p className="d-flex">
                        <strong className="me-1"> Description:</strong>
                        <span>
                          {loanApplicationById?.application_type === "micro"
                            ? loanApplicationById?.purpose?.replaceAll("_", " ")
                            : loanApplicationById?.supplier?.business_name}
                        </span>
                      </p>
                    </div>
                    <div className="col-sm-4">
                      <p className="d-flex">
                        <strong className="me-1">{t("date_submitted")}:</strong>
                        <span>
                          {moment(loanApplicationById?.created_at).format(
                            "DD/MM/YYYY"
                          )}
                        </span>
                      </p>
                      <p className="d-flex">
                        <strong className="me-1">{t("status")}: </strong>
                        <span>{status(loanApplicationById?.status)}</span>
                      </p>
                    </div>
                    <div className="">
                      <p className="d-flex">
                        <strong className="me-1">Due Date:</strong>
                        <span>
                          {!!loanApplicationById?.loan_due_date &&
                            moment(loanApplicationById.loan_due_date).format(
                              "DD/MM/YYYY"
                            )}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="table-responsive mt-5 mb-4">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>{t("amount_requested")}</td>
                          <td>
                            <MoneyInput data={loanApplicationById?.principal} />
                          </td>
                        </tr>
                        <tr>
                          <td>{t("net_term")}</td>
                          <td>
                            {loanApplicationById?.tenure} {t("days")}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {t("interest_rate")}
                            (%)
                          </td>

                          <td>
                            {loanApplicationById?.loan_interest_rate
                              ? loanApplicationById?.loan_interest_rate * 100
                              : ""}{" "}
                            %
                          </td>
                        </tr>
                        <tr>
                          <td>{t("processing_fee")}</td>
                          <td>
                            <MoneyInput
                              data={loanApplicationById?.loan_processing_fee}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>{t("amount_payable_with_fees")}</td>
                          <td>
                            {loanApplicationById?.loan_repayable_amount ? (
                              <MoneyInput
                                data={
                                  loanApplicationById?.loan_repayable_amount
                                }
                              />
                            ) : (
                              "0"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>{t("Amount Due")}</td>
                          <td>
                            <MoneyInput
                              data={loanApplicationById?.amount_due}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>{t("Amount Paid")}</td>
                          <td>
                            <MoneyInput
                              data={loanApplicationById?.amount_paid}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="col-sm-12 text-sm-end d-flex justify-content-between">
                    <UploadButton
                      onUpload={(doc) => addDocuments([doc])}
                      type={LOAN_DOCS}
                      name="grn_document"
                      register={register}
                      control={control}
                      errors={errors}
                      requiredText={t("Good Receive Note (GRN)")}
                      fieldText={t("Click to attach")}
                    />

                    <div>
                      <Link
                        href={`/credit-request/${loanApplicationById?.id}/view`}
                        className="btn btn-lblue"
                      >
                        {t("view_credit_request_application")}
                      </Link>
                      {loanApplicationById?.status === "approved" && (
                        <Link
                          href={`/loan-application/${loanApplicationById?.id}/add-payment`}
                          className="btn btn-fill ms-2"
                        >
                          {t("make_payment")}
                        </Link>
                      )}
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
import { GetServerSideProps } from "next";
import { ReadyState } from "react-use-websocket";
import UploadButton from "@/components/Button/uploadButton";
import { LOAN_DOCS } from "@/common/utils/constant";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { urls } from "@/common/apis/urls";
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
