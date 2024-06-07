/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import { useRouter } from "next/router";
import TableSkeleton from "../skeleton/tableSkeleton";
import { handleStatus } from "@/common/commonMethod";
import Link from "next/link";
import MoneyInput from "../form/MoneyInput";
import moment from "moment";
import AddComment from "@/components/modalBox/addComment";
import ViewComment from "@/components/modalBox/viewComment";
import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";
import { ReadyState } from "react-use-websocket";
import { Collapse } from "react-bootstrap";
import ShowPayment from "../modalBox/showPayment";

interface IProps {
  hydrated?: boolean;
  query?: any;
}

export default function CredTable(props: IProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [viewCommentModal, setViewCommentModal] = useState(false);
  const [data, setData] = useState<any>();
  const [isCreditRequest, setIsCreditRequest] = useState(false);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState();
  const [openEmi, setOpenEmi] = useState(false);
  const [showAddCommentModal, setShowAddCommentModal] = useState(false);

  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  const { t } = useTranslation("common");
  const router = useRouter();
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const refList = (useContext(appContext) as AppContext).refList;
  const {
    socketStatus,
    loanApplicationsStatus,
    loanApplications,
    commentStatus,
  } = storeData;

  useEffect(() => {
    if (socketStatus === ReadyState.OPEN) {
      setIsCreditRequest(true);
      fetchLoanApplications(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketStatus, JSON.stringify(props.query)]);

  const deleteComment = async (val: string) => {
    if (!val) {
      setStoreData({ buttonLoading: true });
      const res = await apis.UpdateCreditComment({
        comment: val,
        id: data?.id,
      });
      if (res.statusCode === 200) {
        setStoreData({ [res?.["traceId"]]: "commentStatus" });
      } else {
        setStoreData({ buttonLoading: false });
        toast.error(res?.["message"]);
      }
    }
    setViewCommentModal(false);
  };

  const fetchLoanApplications = async (page: number) => {
    setStoreData({ buttonLoading: true });
    const res = await apis.fetchLoanApplications({
      search: "",
      due_date: "",
      status: "",
      page: page,
      ...props.query,
    });
    if (res.statusCode === 200) {
      setStoreData({ [res?.["traceId"]]: "loanApplicationsStatus" });
    } else {
      setStoreData({ buttonLoading: false });
      toast.error(res?.["message"]);
    }
  };

  useEffect(() => {
    if (loanApplicationsStatus?.["statusCode"] === 200) {
      setStoreData({ buttonLoading: false });
      setStoreData({
        loanApplications: loanApplicationsStatus?.["data"]?.results,
      });
    } else if (loanApplicationsStatus?.["statusCode"] !== 200) {
      setStoreData({ buttonLoading: false });
      toast.error(loanApplicationsStatus?.["msg"]);
    }

    return () => {
      setStoreData({
        loanApplicationsStatus: undefined,
        searchStatus: "",
        searchData: "",
        searchDate: "",
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanApplicationsStatus]);

  useEffect(() => {
    if (commentStatus !== undefined && commentStatus?.["statusCode"] === 200) {
      setStoreData({ buttonLoading: false });
      fetchLoanApplications(page);
      setStoreData({
        loanApplicationsStatus: undefined,
        searchStatus: "",
        searchData: "",
        searchDate: "",
      });
    } else if (
      commentStatus !== undefined &&
      commentStatus?.["statusCode"] !== 200
    ) {
      setStoreData({ buttonLoading: false });
      toast.error(commentStatus?.["msg"]);
    }

    return () => {
      setStoreData({
        commentStatus: undefined,
      });
    };
  }, [commentStatus]);

  const addComment = async (val: string) => {
    if (val) {
      setStoreData({ buttonLoading: true });
      const res = await apis.UpdateCreditComment({
        comment: val,
        id: data?.id,
      });
      if (res.statusCode === 200) {
        setStoreData({ [res?.["traceId"]]: "commentStatus" });
      } else {
        setStoreData({ buttonLoading: false });
        toast.error(res?.["message"]);
      }
    }
    setShowAddCommentModal(false);
  };
  function isInTheFuture(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  }
  const emiCalculation = (emi: any, payment: any, item: any) => {
    const id = item.id;
    let statusPaymentReview = false;
    let lastEmi = isInTheFuture(new Date(emi?.[3]?.due_date));
    return (
      <div className="d-flex justify-content-around">
        <hr />
        {emi?.map((item, index) => {
          let status = "";
          let classValue = "";
          let text = t(item.status);
          if (item?.status === "paid") {
            status = "bg-dblue";
            classValue = "text-center text-dblue";
            text = t("paid");
          } else if (item?.status === "pending") {
            if (
              payment?.filter((item) => {
                if (item?.status === "pending") return true;
              }).length > 0 &&
              !statusPaymentReview
            ) {
              status = "bg-secondary";
              classValue = "text-center text-secondary";
              statusPaymentReview = true;
              text = t("payment_in_review");
            } else {
              if (!lastEmi) {
                status = "bg-danger";
                classValue = "text-center text-danger";
                text = t("due");
              } else {
                status = "bg-warning";
                classValue = "text-center text-warning";
                text = t("due");
              }
            }
          }
          return (
            <div className={classValue} key={index}>
              <span className={status}>{index + 1}</span>
              <p>
                {moment(item?.due_date).format("DD MMM YYYY")}
                <br />
                <MoneyInput
                  class={`${classValue} viewamount`}
                  data={item?.amount}
                />
                <strong>{text}</strong>
              </p>
            </div>
          );
        })}

        {item?.amount_due > 0 && (
          <div className="text-center pt-4">
            <p className="mb-0 text-black fw-semibold">
              {t("pay_four_installments")}
            </p>
            <Link
              href={`/loan-application/${id}/add-payment`}
              className="btn btn-fill btn-sm"
            >
              {t("make_payment")}
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="card p-4">
      <div
        className={
          loanApplications?.length > 1
            ? "table-responsive text-nowrap"
            : "table-responsive pb-15 no-space"
        }
      >
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "15%" }}>{t("application_id")}</th>
              <th style={{ width: "15%" }}>{t("description")}</th>
              <th style={{ width: "10%" }}>{t("amount_requested")}</th>
              <th style={{ width: "12%" }}>
                {t("net_term")}/
                <br />
                {t("due_date")}
              </th>
              <th style={{ width: "10%" }}>{t("amount_payable")}</th>
              <th style={{ width: "10%" }}>{t("date_submitted")}</th>
              <th style={{ width: "13%" }}>{t("status")}</th>
              <th className="text-center">{t("actions")}</th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {storeData?.buttonLoading ? (
              <TableSkeleton count={8} loading={storeData?.buttonLoading} />
            ) : loanApplications?.length > 0 ? (
              loanApplications?.map((item: any, index: any) => {
                return (
                  <>
                    <tr key={index}>
                      <td>
                        <Link href={`/credit-request/${item?.id}/detail`}>
                          <span className="text-black">
                            {" "}
                            {item?.application_number}
                          </span>
                          <br />
                          <small className="text-blue">
                            {item?.application_type === "micro"
                              ? t("micro_line_of_credit")
                              : t("revolving_line_of_credit")}
                          </small>
                        </Link>
                      </td>
                      <td>
                        {item?.application_type === "micro"
                          ? item?.purpose?.replaceAll("_", " ")
                          : item?.supplier?.business_name}
                      </td>
                      <td>
                        <MoneyInput data={item?.principal} />
                      </td>
                      <td>
                        {item?.tenure} {t("days")}
                        <br />
                        {!!item.loan_due_date &&
                          moment(item?.loan_due_date).format("DD/MM/YYYY")}
                      </td>
                      <td>
                        <MoneyInput data={item.loan_repayable_amount} />
                      </td>
                      <td>{moment(item?.created_at).format("DD/MM/YYYY")}</td>
                      <td>{handleStatus(item?.status)}</td>
                      <td className="action-icons text-center">
                        <Dropdown>
                          <Dropdown.Toggle
                            className="btn p-0 dropdown-toggle hide-arrow"
                            variant=""
                          >
                            <span className="icon-more">
                              <span className="path1"></span>
                              <span className="path2"></span>
                              <span className="path3"></span>
                            </span>
                          </Dropdown.Toggle>
                          <span
                            className="ms-2 action-dropdown"
                            onClick={() => {
                              setOpen(item?.id), setOpenEmi(!openEmi);
                            }}
                            aria-expanded={open}
                            aria-controls={item?.id}
                          >
                            <img
                              src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/dropdown.svg`}
                            />
                          </span>

                          <Dropdown.Menu>
                            <span
                              className="dropdown-item link-pointer"
                              onClick={() => {
                                setShowPaymentModal(true);
                                setData(item);
                              }}
                            >
                              <span className="icon-view me-2">
                                <span className="path1"></span>
                                <span className="path2"></span>
                              </span>{" "}
                              {t("show_payment")}
                            </span>
                            {item.amount_due > 0 && (
                              <Link
                                className="dropdown-item"
                                href={`/loan-application/${item?.id}/add-payment`}
                              >
                                <span className="icon-create">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </span>
                                {t("create_payment")}
                              </Link>
                            )}

                            <Link
                              href={`/credit-request/${item?.id}/view`}
                              className="dropdown-item"
                            >
                              <span className="icon-view me-2">
                                <span className="path1" />
                                <span className="path2" />
                              </span>
                              {t("preview_summary")}
                            </Link>
                            <Link
                              href={`/credit-request/${item?.id}/document-summary`}
                              className="dropdown-item"
                            >
                              <span className="icon-attachment ti-xs me-2"></span>
                              {t("attachment")}
                            </Link>
                            {item?.comment ? (
                              <span
                                className="dropdown-item"
                                onClick={() => {
                                  setData(item), setViewCommentModal(true);
                                }}
                              >
                                <span className="icon-messages ti-xs me-2">
                                  <span className="path1" />
                                  <span className="path2" />
                                  <span className="path3">
                                    <span className="path4"></span>
                                    <span className="path5"></span>
                                  </span>
                                </span>
                                {t("comment")}
                              </span>
                            ) : (
                              <span
                                className="dropdown-item"
                                onClick={() => {
                                  setData(item);
                                  setShowAddCommentModal(true);
                                }}
                              >
                                <span className="icon-messages ti-xs me-2">
                                  <span className="path1" />
                                  <span className="path2" />
                                  <span className="path3">
                                    <span className="path4"></span>
                                    <span className="path5"></span>
                                  </span>
                                </span>
                                {t("comment")}
                              </span>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                    <Collapse in={open === item?.id ? openEmi : false}>
                      <tr className="collapse table-collapse" id={item?.id}>
                        <td colSpan={9}>
                          {item?.emi_schedules &&
                            emiCalculation(
                              item?.emi_schedules,
                              item?.payments,
                              item
                            )}
                        </td>
                      </tr>
                    </Collapse>
                  </>
                );
              })
            ) : (
              <tr>
                <td
                  rowSpan={8}
                  colSpan={10}
                  className="empty_inventory_td text-center"
                >
                  <Link
                    href={"/apply-credit"}
                    className={props?.hydrated ? "" : "link_disabled"}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/empty-logo.svg`}
                      alt=""
                    />
                  </Link>
                  <p className="mt-1 mb-3">{t("no_data_available")} </p>
                  <Link
                    href={"/apply-credit"}
                    className={
                      props?.hydrated ? "btn btn-fill" : "btn btn-fill"
                    }
                  >
                    {t("apply_for_credit")}
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showPaymentModal && (
        <ShowPayment data={data} handleModel={setShowPaymentModal} />
      )}
      {showAddCommentModal && <AddComment handleModel={addComment} />}
      {viewCommentModal && (
        <ViewComment data={data} handleModel={deleteComment} />
      )}
    </div>
  );
}
