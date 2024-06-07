import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import NavbarBanner from "@/components/layout/NavbarBanner";
import Sidebar from "@/components/SidebarLayout";
import Header from "@/components/layout/Header";
import parse from "html-react-parser";
import moment from "moment";
import { useRouter } from "next/router";
import BusinessInfoInput from "@/components/form/businessInfoInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputAmountReactForm from "@/components/form/inputAmountReactForm";
import TextReactAreaForm from "@/components/form/inputTextReactArea";
import CreatePaymentModal from "@/components/modalBox/createPaymentModal";
import BackButton from "@/components/Button/backButton";
import UploadButton from "@/components/Button/uploadButton";
import { LOAN_DOCS } from "@/common/utils/constant";

export default function AddPayment() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { id } = router.query;
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    loan_application_id: "",
    amount_paying: "",
    create_payment_note: "",
    payment_mode: "",
    description: "",
    amount_due: "",
    id: "",
    payment_reference_number: "",
  });
  const [isCredRequest, setIsCredRequest] = useState(false);
  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
    setDataError: state.setDataError,
  }));
  const { getLoanApplicationByIdStatus, createPaymentStatus, socketStatus } =
    storeData;

  const apis = (useContext(appContext) as AppContext).apis as Api;

  interface IFormInputs {
    loan_application_id: string;
    amount_paying: string;
    create_payment_note: string;
    payment_mode: string;
    description: string;
    amount_due: string;
    proof_payment_doc: string;
    installment_date: string;
  }
  const paymentErrorMsg = useTranslation("addpaymentErrorMessage").t;
  const schema = yup.object().shape({
    loan_application_id: yup
      .string()
      .required(paymentErrorMsg("loan_application_id")),
    amount_due: yup.string().required(paymentErrorMsg("amount_due")),
    description: yup.string().required(paymentErrorMsg("description")),
    amount_paying: yup.string().required(paymentErrorMsg("amount_paying")),
    create_payment_note: yup
      .string()
      .required(paymentErrorMsg("create_payment_note")),
    payment_mode: yup.string().required(paymentErrorMsg("payment_mode")),
    proof_payment_doc: yup
      .string()
      .required(paymentErrorMsg("proof_payment_doc")),
    installment_date: yup
      .string()
      .required(paymentErrorMsg("installment_date")),
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

  const onSubmit = async (data) => {
    // data.attach = storeData?.attachment_proof;
    data.id = id;
    data["amount_paying"] = data?.amount_paying.replaceAll(",", "");
    setData(data);
    setShowModal(true);
  };
  useEffect(() => {
    setValue("proof_payment_doc", "");
    setStoreData({
      amount_due: "",
      amount_paying: "",
      proof_payment_doc: undefined,
    });
    setValue("amount_paying", "");
  }, []);

  function isInTheFuture(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) < today;
  }

  useEffect(() => {
    if ([200, 201].includes(createPaymentStatus?.["statusCode"])) {
      setStoreData({ buttonLoading: false });
      toast.success(t("payment_successfully_toast"));
      setValue("proof_payment_doc", "");
      setStoreData({
        amount_due: "",
        amount_paying: "",
        proof_payment_doc: undefined,
      });
      setValue("amount_paying", "");
      router.push("/loan-application");
    } else if (createPaymentStatus?.["statusCode"] !== 200) {
      setStoreData({ buttonLoading: false });
      toast.error(createPaymentStatus?.["msg"]);
    }

    return () => {
      setStoreData({
        createPaymentStatus: undefined,
      });
    };
  }, [createPaymentStatus]);

  useEffect(() => {
    if (socketStatus === ReadyState.OPEN && !isCredRequest) {
      setIsCredRequest(true);
      getLoanApplicationById();
    }
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

  const amountPayingCal = (emi: any) => {
    let amount = 0;
    emi?.map((item) => {
      if (
        isInTheFuture(item?.due_date.slice(0, 10)) &&
        item?.status === "pending"
      ) {
        amount += item?.amount;
      }
    });

    if (amount === 0) {
      amount = emi[0]?.amount;
    }

    return amount;
  };

  useEffect(() => {
    if (getLoanApplicationByIdStatus?.["statusCode"] === 200) {
      setStoreData({ buttonLoading: false });
      setStoreData({
        loanApplicationById: getLoanApplicationByIdStatus?.["data"],
      });
      const data = getLoanApplicationByIdStatus?.["data"];
      const pendingEMISchedules = data?.emi_schedules?.filter((item) => {
        if (item?.status === "pending") {
          return item;
        }
      });
      let amountData = amountPayingCal(data?.emi_schedules);
      const amount =
        data?.payments?.length > 0
          ? data?.payments?.reduce((acc, obj) => {
              if (obj.status !== "rejected") {
                return parseFloat(acc) + parseFloat(obj.amount);
              }
              return acc;
            }, 0)
          : 0;

      const totalAmount = amountData - amount;

      setStoreData({
        amount_due: data.amount_due,
      });
      setStoreData({
        amount_paying: totalAmount,
      });

      setValue(
        "description",
        data?.application_type === "micro"
          ? data?.purpose?.replaceAll("_", " ")
          : data?.supplier?.business_name
      );
      setValue("loan_application_id", data?.id);
      setValue("amount_due", amount);
      setValue("amount_paying", totalAmount?.toString());
      setValue(
        "installment_date",
        moment(pendingEMISchedules[0]?.due_date).format("DD/MM/YYYY")
      );
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

  const BusinessInfoDoc = [
    {
      name: "loan_application_id",
      label: t("application_id"),
      disable: true,
    },
    {
      name: "description",
      label: t("description"),
      disable: true,
    },
    {
      noneText: t("payment_mode"),
      name: "payment_mode",
      type: "select",
      label: t("payment_mode"),
      option: [
        { value: "cash", text: "Cash" },
        { value: "cheque", text: "Cheque" },
        { value: "credit", text: "Credit Card" },
        { value: "debit_bank", text: "Direct Debit/Bank Transfe" },
      ],
    },
    {
      name: "installment_date",
      label: t("installment_date"),
      disable: true,
    },
    {
      name: "amount_paying",
      label: t("amount_paying"),
    },
    {
      name: "amount_due",
      label: t("amount_due"),
      disable: true,
    },
    {
      name: "payment_reference_number",
      label: "Payment reference number",
    },
  ];

  const handleData = async (val: boolean) => {
    if (val) {
      setStoreData({ buttonLoading: true });
      const res = await apis.createPaymentById({
        ...data,
        documents: [storeData?.proof_payment_doc],
      });
      if (res.statusCode === 200) {
        setStoreData({ [res?.["traceId"]]: "createPaymentStatus" });
      } else {
        setStoreData({ buttonLoading: false });
        toast.error(res?.["message"]);
      }
      setShowModal(false);
    } else {
      setShowModal(val);
    }
  };

  const goBack = () => router.back();

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar activeClass="payment" />
          <div className="layout-page">
            <NavbarBanner />

            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <Header title={parse(t("create_payment_title"))} />

                <div className="row">
                  <div className="col-md">
                    <div className="card form_content py-5">
                      <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="row">
                            {BusinessInfoDoc?.map((item, index) => {
                              return (
                                <>
                                  {["amount_paying", "amount_due"].includes(
                                    item?.name
                                  ) ? (
                                    <InputAmountReactForm
                                      name={item?.name}
                                      placeHolder={item?.label}
                                      label={item?.label}
                                      register={register}
                                      errors={errors}
                                      disable={item?.disable}
                                    />
                                  ) : (
                                    <BusinessInfoInput
                                      key={index}
                                      {...item}
                                      register={register}
                                      errors={errors}
                                    />
                                  )}
                                </>
                              );
                            })}

                            <div className="col-md-12 wloct">
                              <div className="form-group form_box">
                                <label>{t("note")}</label>
                                <TextReactAreaForm
                                  register={register}
                                  errors={errors}
                                  name="create_payment_note"
                                  row={2}
                                  placeHolder="Add notes or terms and conditions"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row align-items-end">
                            <UploadButton
                              onUpload={(doc) => {
                                setValue("proof_payment_doc", "");
                              }}
                              type={LOAN_DOCS}
                              name="proof_payment_doc"
                              register={register}
                              control={control}
                              errors={errors}
                              requiredText={"*Required"}
                              fieldText={"Attach proof of payment"}
                            />

                            <div className="col-6 text-end">
                              <BackButton
                                text="back"
                                link="#"
                                onClick={goBack}
                              />
                              <button
                                type="submit"
                                data-bs-toggle="modal"
                                data-bs-target="#upload_succesfully"
                                className="btn btn-fill"
                              >
                                {t("pay_now")}
                              </button>
                            </div>
                          </div>
                        </form>
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

      {showModal && (
        <CreatePaymentModal
          title="Would you like to proceed with creation of this
                            payment?"
          handleModel={handleData}
        />
      )}
    </>
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
