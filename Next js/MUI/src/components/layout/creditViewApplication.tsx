import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect } from "react";
import htmlParse from "html-react-parser";
import appContext, { AppContext } from "@/common/context/appContext";
import useStore, { IStore } from "@/common/zustand/store";
import InputAmountForm from "@/components/form/inputAmountForm";
import RadioFormYesNo from "@/components/layout/radioFormYesNo";
import InputViewForm from "@/components/form/inputViewForm";
import {
  creditFormFirst,
  supplierDetails,
  supplierPaymentDetails,
} from "@/common/jsonFiles/credRequestJson";
import MicroFormDocsView from "../microForm/microFormDocsView";
import MicroFormKycDocsView from "../microForm/microFormKycDocsView";
import MicroFormRevolvingView from "../microForm/microFormRevolvingView";
import { useTranslation } from "react-i18next";
import SelectForm from "@/components/form/selectForm";
import { Button } from "react-bootstrap";
import Api from "@/common/apis/apis";
import { urls } from "@/common/apis/urls";
import { toast } from "react-toastify";
import { getStaticProps } from "@/pages";
export { getStaticProps };

export default function CreditViewApplication() {
  const { t } = useTranslation("loanForm");
  const refList = useContext(appContext).refList;
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));
  const { loanApplicationById, application_type } = storeData;
  const router = useRouter();
  const loanApprovalFields = [
    {
      name: "loan_interest_rate",
      placeHolder: t("interest_rate") + "(%)",
      label: t("interest_rate") + "(%)",
    },
    {
      name: "loan_processing_fee",
      placeHolder: t("processing_fee"),
      label: t("processing_fee"),
      type: "amount",
    },
    {
      name: "status",
      placeHolder: t("Choose status"),
      label: t("Change status"),
      type: "dropdown",
      options: [
        {
          value: "approved",
          text: t("Accept"),
        },
        {
          value: "rejected",
          text: t("Reject"),
        },
        {
          value: "pending",
          text: t("Pending"),
        },
        {
          value: "documents_missing",
          text: t("Documents missing"),
        },
        {
          value: "disbursement_pending",
          text: t("Disbursement Pending"),
        },
      ],
    },
    {
      name: "approval_comment",
      placeHolder: t("approval_comment"),
      label: t("approval_comment"),
      type: "textarea",
    },
  ];
  useEffect(() => {
    if (loanApplicationById) {
      const data = {};
      loanApprovalFields.map((field) => {
        const value = loanApplicationById[field.name];
        if (value) {
          data[field.name] = value;
        }
      });
      setStoreData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanApplicationById]);

  const updateLoanApplication = async () => {
    const body = {};
    loanApprovalFields.map((field) => {
      const value = storeData[field.name];
      if (value) {
        body[field.name] = value;
      }
    });
    const res = await apis.apiClient(
      urls.base_url +
      urls.credit.LoanApplication +
      loanApplicationById?.id +
      "/",
      {
        method: "PATCH",
        body: JSON.stringify(body),
      }
    );
    if (res.id) {
      toast.success("Credit request updated successfully");
    } else {
      toast.error(res);
    }
  };

  return (
    <Fragment>
      <div className="row">
        {creditFormFirst?.map((item, index) => {
          const value = item.getValue
            ? item.getValue(storeData, t)
            : storeData?.[item?.name];
          if (item.hideIfEmpty && (value === "" || value === undefined)) {
            return null;
          }
          return item?.inputType !== "amount" ? (
            <div key={item.name} className="col-sm-6">
              <p className="display-7 text-dblue">{item?.label}</p>
              <div className="mb-4 form-label-group">
                <InputViewForm
                  name={item?.name}
                  placeHolder={item?.placeHolder}
                  id={`floating-label${index + 1}`}
                  readOnly={item?.disable}
                  value={value}
                />
                <label htmlFor={`floating-label${index + 1}`}>
                  {item?.placeHolder}
                </label>
              </div>
            </div>
          ) : (
            <div key={item.name} className="col-sm-6">
              <p className="display-7 text-dblue">{item?.label}</p>
              <InputAmountForm
                name={item?.name}
                label={item?.label}
                placeHolder={item?.placeHolder}
                id={item?.name}
                readOnly={item?.disable}
              />
            </div>
          );
        })}
      </div>
      <hr />
      <div className="row">
        <p className="display-7 text-dblue mt-1">
          {t("choose_has_alternate_income_source")}
        </p>
        <RadioFormYesNo name="has_alternate_income_source" disable={true} />
        {[true, "yes"].includes(storeData?.has_alternate_income_source) && (
          <div className="col-sm-12 mt-3">
            <div className="mb-4 form-label-group wd-40">
              <InputViewForm
                name={"alternate_income_source_desc"}
                id={`floating-label25`}
                placeHolder={""}
                readOnly={true}
                value={storeData?.alternate_income_source_desc}
              />
              <label htmlFor="floating-label4">
                {t("label_alternate_income_source")}
              </label>
            </div>
          </div>
        )}
      </div>

      <hr className="my-xl-3" />
      <div className="row">
        <p className="display-7 text-dblue mt-1">
          {t("choose_other_finance_form")}
        </p>
        <RadioFormYesNo name="has_other_finance_form" disable={true} />
        {[true, "yes"].includes(storeData?.has_other_finance_form) && (
          <div className="row mt-3">
            <div className="mb-4 form-label-group wd-40">
              <InputViewForm
                name={"other_finance_form_desc"}
                id={`floating-label25`}
                placeHolder={""}
                readOnly={true}
                value={t(storeData?.other_finance_form_desc)}
              />
              <label htmlFor="floating-label4">
                {t("placeholder_other_finance_form_desc")}
              </label>
            </div>
          </div>
        )}
      </div>

      <hr className="my-xl-3" />
      <div className="row">
        <p className="display-7 text-dblue mt-1">
          {htmlParse(t("are_you_currently_repaying_loan"))}
        </p>
        <RadioFormYesNo name="has_existing_loan" disable={true} />
        {[true, "yes"].includes(storeData?.has_existing_loan) && (
          <div className="row mt-3">
            <div className="col-sm-6">
              <InputViewForm
                name={"existing_loan_type"}
                id={`floating-label25`}
                placeHolder={t("enter_loan_type")}
                readOnly={true}
                value={storeData?.existing_loan_type}
              />
            </div>
            <div className="col-sm-6">
              <InputAmountForm
                name={"existing_loan_amount"}
                label={t("enter_details_below")}
                placeHolder={""}
                readOnly={true}
              />
            </div>
          </div>
        )}
      </div>

      <hr className="my-xl-3" />

      {application_type === "revolving" ? (
        <MicroFormRevolvingView />
      ) : (
        <MicroFormDocsView />
      )}
      <MicroFormKycDocsView />
      {application_type === "revolving" && (
        <Fragment>
          <hr className="my-xl-4" />
          <p className="display-7 text-dblue mt-3">
            {t("like_to_get_your_supplier")}
          </p>
          <div className="row">
            {supplierDetails?.map((item, index) => {
              return (
                <div className="col-sm-6" key={item.name}>
                  <div className="mb-4 form-label-group">
                    <InputViewForm
                      name={item?.name}
                      placeHolder={item?.label}
                      id={`floating-label${index + 1}`}
                      readOnly={item?.disable}
                      value={storeData?.[item?.name]}
                    />
                    <label htmlFor={`floating-label${index + 1}`}>
                      {item?.label}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
          <hr className="my-xl-4" />
          <div className="col-sm-12 mt-3">
            <p className="display-7 text-dblue">
              {t("supplier_preferred_method")}
            </p>
            <div className="row">
              <div className="col-sm-6">
                <div className="mb-4 form-label-group">
                  <InputViewForm
                    readOnly={true}
                    value={t(
                      storeData?.supplier_payment_method || "mobile_transfer"
                    )}
                  />
                  <label htmlFor="floating-label4">
                    {t("choose_method_of_payment")}
                  </label>
                </div>
              </div>
              {supplierPaymentDetails?.map((item, index) => {
                const value = storeData?.[item?.name];
                return value ? (
                  <div className="col-sm-6" key={index}>
                    <div className="mb-4 form-label-group">
                      <InputViewForm
                        name={item?.name}
                        placeHolder={item?.label}
                        id={`floating-label${index + 1}`}
                        readOnly={item?.disable}
                        value={value}
                      />
                      <label htmlFor={`floating-label${index + 1}`}>
                        {item?.label}
                      </label>
                    </div>{" "}
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </Fragment>
      )}
      {loanApplicationById &&
        loanApplicationById?.permissions.includes("change_loanapplication") && (
          <>
            <hr className="my-xl-3" />

            <div className="row">
              <div className="col-sm-12 mt-1">
                <p className="display-7 text-dblue">{t("application_status")}</p>
              </div>
              {loanApprovalFields.map((item, index) =>
                item.type === "dropdown" ? (
                  <div className="col-sm-6 mb-4 form-label-group" key={index}>
                    <SelectForm
                      noneText={item.placeHolder}
                      options={item.options}
                      name={item?.name}
                    />
                  </div>
                ) : (
                  <div className="col-sm-6 mb-4 form-label-group" key={index}>
                    <InputViewForm
                      name={item?.name}
                      placeHolder={item?.label}
                      id={`floating-label-${item.name}`}
                      value={storeData?.[item?.name]}
                    />
                    <label htmlFor={`floating-label-${item.name}`}>
                      {item?.label}
                    </label>
                  </div>
                )
              )}
            </div>
            <Button className="btn w-25 mx-3 btn-primary" onClick={updateLoanApplication}>
              Update Credit Request
            </Button>
          </>
        )}
    </Fragment>
  );
}
