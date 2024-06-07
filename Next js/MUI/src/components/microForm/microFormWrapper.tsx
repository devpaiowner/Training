import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Api from "@/common/apis/apis";
import useStore, { IStore } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import Stepper from "@/components/layout/stepper";
import FormSubmitModal from "../modalBox/formSubmitModal";
import ExitModal from "../modalBox/exitModal";
import validation, { resValidation } from "@/common/utils/validation";
import SubmitModal from "../modalBox/submitModal";
import { getStaticProps } from "@/pages";
export { getStaticProps };
interface IProps {
  step: number;
  isStepper: Boolean;
  handleBack: Function;
  formDetails: any;
  setFormDetails: any;
  children: React.ReactElement;
}
export default function MicroFormWrapper(props?: IProps) {
  const router = useRouter();
  const [exit, setExit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const formName = ["ExactAmountNeeded", "EstimatedTotalIncome"];
  const procedButton = ["ReviewLoanApplication"];

  const { storeData, setStoreData, setDataError, setNewError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
      setNewError: state.setNewError,
    })
  );

  const apis = (useContext(appContext) as AppContext).apis as Api;
  const refList = (useContext(appContext) as AppContext).refList;
  const handleExit = (val: boolean) => {
    setExit(val);
  };

  const handelModal = async (show: boolean) => {
    setShowSubmitModal(false);
    if (show) {
      let applicationType: string;
      if (router?.pathname === "/revolving-form") {
        applicationType = "revolving";
      } else {
        applicationType = "micro";
      }

      const res = await apis.submitLoapApplication(
        {
          ...storeData,
          application_type: applicationType,
        } as any,
        applicationType
      );

      if (res.statusCode === 200) {
        setStoreData({ [res?.["traceId"]]: "creditFormStatus" });
        setStoreData({
          supplier_email: "",

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
          supplier_director_name: "",

          supplier_business_name: "",
          supplier_mobile: "",
          supplier_address: "",

          application_type: "",
          purpose_other: "",
          partner: "",
          partner_full_name: "",
          partner_email: "",
          partner_mobile: "",

          trading_license: "",
          lease_agreement: "",
          title_deed: "",
          power_attorney: "",
          tbs: "",
          kycBoostFile6: "",
          kycBoostDoc6: "",

          inventoryLpo: "",
          inventoryLpoStore: "",

          tncAgree: false,

          multipleInvoiceList: [],

          payrollDoc1: "",
          payrollDoc2: "",
          payrollDoc3: "",
        });
        setShowModal(true);
      } else {
        setStoreData({ buttonLoading: false });
        toast.error(res?.["message"]);
        if (res?.error?.[0]?.message) {
          resValidation(res?.error?.[0]?.message, setDataError, refList);
        }
      }
    }
  };

  const handleSubmit = async () => {
    // * Validation START //
    const validationField = ["tncAgree"];
    if (validation(storeData, validationField, setNewError, refList)) return "";
    // * Validation END //

    setShowSubmitModal(true);
  };

  const handleEdit = () => {
    props?.setFormDetails({
      form: "ExactAmountNeeded",
      stepperPer: 10,
      isStepper: true,
      handleBack: () => props?.handleBack(true),
    });
  };

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div
          className={
            props?.formDetails?.form === "ExactAmountNeeded"
              ? "card p-50 database-bg"
              : props?.formDetails?.form === "PayAmountBack"
              ? "card p-50 clock-bg"
              : "card p-50"
          }
        >
          {props.isStepper && <Stepper step={props.step} />}
          {props.children}

          {formName.includes(props?.formDetails?.form) && (
            <div className="space-break"></div>
          )}
          <div
            className={
              formName.includes(props?.formDetails?.form)
                ? "d-flex justify-content-between"
                : "mt-5 pt-4 d-flex justify-content-between"
            }
          >
            <div className="text-start">
              {props?.formDetails?.form === "KycDocumentsToBoost" && (
                <button
                  type="submit"
                  className="btn btn-blue px-xl-4 me-2 waves-effect waves-light"
                >
                  Review
                </button>
              )}
              {!procedButton?.includes(props.formDetails?.form) ? (
                <button
                  type="button"
                  className="btn btn-white"
                  onClick={() => {
                    handleExit(true);
                  }}
                >
                  Exit
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-blue px-xl-5 me-2 waves-effect waves-light"
                  onClick={() => {
                    handleEdit();
                  }}
                >
                  Edit
                </button>
              )}
            </div>
            <div className="text-end">
              <span
                onClick={() => props.handleBack()}
                className="btn btn-blue btn-icon me-2"
              >
                <i className="ti ti-chevron-left ti-md"></i>
              </span>
              {!procedButton?.includes(props.formDetails?.form) ? (
                <button type="submit" className="btn btn-fill">
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="btn btn-fill"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="content-backdrop fade"></div>
      {showModal && <FormSubmitModal handleModel={setShowModal} />}
      {exit && <ExitModal handleModel={handleExit} />}
      {/* {showSubmitModal && ( */}
      <SubmitModal show={showSubmitModal} handleModel={handelModal} />
      {/* )} */}
    </div>
  );
}
