import React, { useContext, useEffect, useState } from "react";
import useStore, { IStore } from "@/common/zustand/store";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import moment from "moment";
import MoneyInput from "../form/MoneyInput";
import Link from "next/link";
import PaymentNoteView from "./paymentNote";
import EmptyScreen from "../layout/emptyScreen";
import { useTranslation } from "react-i18next";
import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import { urls } from "@/common/apis/urls";
import SelectForm from "@/components/form/selectForm";
import { toast } from "react-toastify";
interface Iprops {
  handleModel?: Function;
  data: any;
}

export default function ShowPayment(props: Iprops) {
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("modal");
  const [data, setData] = useState("");
  const [payments, setPayments] = useState([]);
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));

  const fetchPayments = async () => {
    const res = await apis.apiClient(
      urls.base_url +
        urls.billing.Payment +
        "?loan_application__id=" +
        props.data?.id
    );
    if (res.count > 0) {
      setPayments(res.results);
    }
  };

  useEffect(() => {
    if (props.data?.id) {
      fetchPayments();
    }
  }, [props.data?.id]);

  const handleClose = () => {
    props.handleModel(false);
    setShow(false);
  };

  const updatePaymentStatus = async (paymentId, status) => {
    const res = await apis.apiClient(
      urls.base_url + urls.billing.Payment + paymentId + "/",
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }
    );
    if (res.id) {
      toast.success("Payment updated successfully");
      setPayments(
        payments.map((payment) => {
          if (payment.id === paymentId) {
            return res;
          } else {
            return payment;
          }
        })
      );
    } else {
      toast.error(res.message);
    }
  };

  const handleStatus = (status) => {
    let classN = "bg-grey text-center d-block",
      text = status;
    switch (status) {
      case "pending":
        classN = "bg-warning text-center d-block";
        text = t("pending");
        break;
      case "confirmed":
        classN = "bg-success text-center d-block";
        text = t("approved");
        break;
      case "rejected":
        classN = "bg-danger text-center d-block";
        text = t("rejected");
        break;

      default:
        break;
    }
    return <span className={classN}>{text}</span>;
  };

  return (
    <Modal show={show} centered size="xl">
      <div className="modal-header btn_close_btn">
        <h5 className="text-black mb-0"> {t("show_payment")}</h5>
        <button type="button" className="btn_close_icon" onClick={handleClose}>
          <span className="icon-cross ti-md"></span>
        </button>
      </div>
      <div className="modal-body">
        <div className="table-responsive">
          <table className="table showpayment">
            <tr>
              <th style={{ width: "20%" }}>{t("application_id")}</th>
              <th style={{ width: "20%" }}>{t("description")}</th>
              <th style={{ width: "20%" }}>{t("amount")}</th>
              <th style={{ width: "15%" }}>{t("payment_status")}</th>
              <th style={{ width: "20%" }}>{t("installment_date")}</th>
              <th style={{ width: "5%" }}>{t("note")}</th>
            </tr>
            {payments?.length > 0 ? (
              payments?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {props?.data?.application_number}
                      <br />
                      <small className="text-blue">
                        {props?.data?.application_type === "micro"
                          ? t("micro_line_of_credit")
                          : t("revolving_line_of_credit")}
                      </small>
                    </td>
                    <td>
                      {props?.data?.application_type === "micro"
                        ? props?.data?.purpose?.replaceAll("_", " ")
                        : props?.data?.supplier?.business_name}
                    </td>
                    <td>
                      <MoneyInput data={item?.amount} />

                      <br />
                      {item?.payment_mode}
                    </td>
                    <td>
                      {item.permissions.includes("change_payment") &&
                      !["confirmed"].includes(item.status) ? (
                        <SelectForm
                          name="payment_status"
                          noneText="Status"
                          class="form-select form-control p-1"
                          defaultValue={item.status}
                          OnChangeText={(status) =>
                            updatePaymentStatus(item.id, status)
                          }
                          options={[
                            {
                              value: "waiting",
                              text: t("Pending"),
                            },
                            {
                              value: "confirmed",
                              text: t("Approved"),
                            },
                            {
                              value: "rejected",
                              text: t("Rejected"),
                            },
                          ]}
                        />
                      ) : (
                        handleStatus(item?.status)
                      )}
                    </td>
                    <td>{moment(item?.created_at).format("DD/MM/YYYY")}</td>
                    <td className="pe-0">
                      <span
                        onClick={() => {
                          setData(item?.notes), setShowModal(true);
                        }}
                      >
                        <span className="icon-messages ti-md">
                          <span className="path1"></span>
                          <span className="path2"></span>
                          <span className="path3"></span>
                          <span className="path4"></span>
                          <span className="path5"></span>
                        </span>
                      </span>
                      {item?.documents?.[0]?.file && (
                        <Link href={item?.documents?.[0]?.file} target="_blank">
                          <span className="icon-attachment ti-md"></span>
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <EmptyScreen text={t("payment_list_empty")} link="/" />
            )}
          </table>
        </div>
      </div>
      {showModal && (
        <PaymentNoteView
          data={data}
          handleModel={() => {
            setShowModal(false);
          }}
        />
      )}
    </Modal>
  );
}
