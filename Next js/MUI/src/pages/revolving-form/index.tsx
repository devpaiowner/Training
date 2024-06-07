import React, { useContext, useState } from "react";
import Sidebar from "@/components/SidebarLayout";
import NavbarBanner from "@/components/layout/NavbarBanner";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import useStore, { IStore } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import ExitModal from "@/components/modalBox/exitModal";
import MicroFormWrapper from "@/components/microForm/microFormWrapper";
import { toast } from "react-toastify";
import AllForm from "@/components/microForm/steps";
import validation from "@/common/utils/validation";

export default function Revolving() {
  const router = useRouter();
  const [exit, setExit] = useState(false);

  const [formDetails, setFormDetails] = useState({
    form: "ExactAmountNeeded",
    stepperPer: 10,
    isStepper: true,
    handleBack: () => handleBack(true),
  });
  const { t } = useTranslation("errorMessage");

  const handleBack = async (init = false) => {
    if (init) {
      router ? router?.push("/apply-credit") : () => {};
    } else {
      setFormDetails(formDetails);
      return true;
    }
  };
  const { storeData, setStoreData, setDataError, setNewError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
      setNewError: state.setNewError,
    })
  );
  const refList = (useContext(appContext) as AppContext).refList;
  const SubmitHandler = (e) => {
    e.preventDefault();
    const validationField = [];
    switch (formDetails.form) {
      case "ExactAmountNeeded": {
        validationField.push("principal");
        if (validation(storeData, validationField, setDataError, refList)) {
          break;
        }
        setFormDetails({
          form: "PurposeFinancing",
          stepperPer: 20,
          isStepper: true,
          handleBack,
        });
        break;
      }
      case "PurposeFinancing":
        validationField.push("purpose");
        if (validation(storeData, validationField, setDataError, refList)) {
          break;
        }
        setFormDetails({
          form: "ApplySoloOrPartner",
          stepperPer: 20,
          isStepper: true,
          handleBack,
        });
        break;
      case "ApplySoloOrPartner":
        if (!storeData?.partner) {
          validationField.push("partner");
        } else if (storeData?.partner === "partnership") {
          validationField.push(
            "partner_full_name",
            "partner_email",
            "partner_mobile"
          );
        }
        if (validation(storeData, validationField, setDataError, refList)) {
          break;
        }
        setFormDetails({
          form: "PayAmountBack",
          stepperPer: 30,
          isStepper: true,
          handleBack,
        });
        break;
      case "PayAmountBack":
        validationField.push("tenure");
        if (validation(storeData, validationField, setDataError, refList)) {
          break;
        }
        setFormDetails({
          form: "MethodOfRepayment",
          stepperPer: 40,
          isStepper: true,
          handleBack,
        });
        break;
      case "MethodOfRepayment":
        if (!storeData?.repayment_method) {
          validationField.push("repayment_method");
        } else if (storeData?.repayment_method === "bank_transfer") {
          validationField.push(
            "account_name",
            "account_number",
            "bank_name",
            "bank_branch_code"
          );
        } else {
          validationField.push("account_name", "mobile");
        }

        if (validation(storeData, validationField, setDataError, refList)) {
          break;
        }
        setFormDetails({
          form: "EstimatedTotalIncome",
          stepperPer: 50,
          isStepper: true,
          handleBack,
        });
        break;

      case "EstimatedTotalIncome":
        validationField.push("total_monthly_income");
        if (validation(storeData, validationField, setDataError, refList)) {
          break;
        }
        setFormDetails({
          form: "AlternateSourcesOfIncome",
          stepperPer: 70,
          isStepper: true,
          handleBack,
        });
        break;
      case "AlternateSourcesOfIncome":
        if (!storeData?.has_alternate_income_source) {
          validationField.push("has_alternate_income_source");
        } else if (storeData?.has_alternate_income_source === "yes") {
          validationField.push("alternate_income_source_desc");
        }
        if (validation(storeData, validationField, setDataError, refList)) {
          break;
        }
        setFormDetails({
          form: "FinancingBefore",
          stepperPer: 80,
          isStepper: true,
          handleBack,
        });
        break;
      case "FinancingBefore":
        if (!storeData?.has_other_finance_form) {
          validationField.push("has_other_finance_form");
        } else if (storeData?.has_other_finance_form === "yes") {
          validationField.push("other_finance_form_desc");
        }

        if (validation(storeData, validationField, setDataError, refList)) {
          break;
        }
        setFormDetails({
          form: "PayBackOverTheNext3Months",
          stepperPer: 90,
          isStepper: true,
          handleBack,
        });
        break;
      case "PayBackOverTheNext3Months":
        if (!storeData?.has_existing_loan) {
          validationField.push("has_existing_loan");
        } else if ([true, "yes"].includes(storeData?.has_existing_loan)) {
          validationField.push("existing_loan_type", "existing_loan_amount");
        }
        if (validation(storeData, validationField, setDataError, refList)) {
          break;
        }
        setFormDetails({
          form: "YourSupplierDetails",
          stepperPer: 90,
          isStepper: true,
          handleBack,
        });
        break;
      case "YourSupplierDetails":
        validationField.push(
          "supplier_tin",
          "supplier_email",
          "supplier_business_name",
          "supplier_address",
          "supplier_director_name",
          "supplier_mobile"
        );
        const validatedErrors = validation(
          storeData,
          validationField,
          setDataError,
          refList
        );
        if (validatedErrors) {
          break;
        }
        setFormDetails({
          form: "PreferredMethodOfPayment",
          stepperPer: 90,
          isStepper: true,
          handleBack,
        });
        break;
      case "PreferredMethodOfPayment":
        if (!storeData?.supplier_payment_method) {
          validationField.push("supplier_payment_method");
        } else if (storeData?.supplier_payment_method === "bank_transfer") {
          validationField.push(
            "supplier_account_name",
            "supplier_account_number",
            "supplier_bank_name",
            "supplier_bank_branch_code"
          );
        } else
          validationField.push("supplier_business_name", "supplier_mobile");
        if (validation(storeData, validationField, setDataError, refList)) {
          break;
        }
        setFormDetails({
          form: "selectedPayrollRevolving",
          stepperPer: 100,
          isStepper: true,
          handleBack,
        });
        break;
      case "selectedPayrollRevolving":
        let uploadedCount = 0;
        if (storeData?.multipleInvoiceList?.length > 0) {
          storeData?.multipleInvoiceList?.map((item, index) => {
            for (const [key, value] of Object.entries(item)) {
              if (value) {
                uploadedCount += 1;
              }
            }
          });
        }
        const ok = uploadedCount >= 3;
        if (!ok) {
          toast.error(t("multipleInvoiceUpload"));
          validationField.push("multipleInvoiceUpload");
          if (validation(storeData, validationField, setDataError, refList)) {
            break;
          }
        }
        setFormDetails({
          form: "KycDocumentsToBoost",
          stepperPer: 100,
          isStepper: false,
          handleBack,
        });
        break;
      case "KycDocumentsToBoost":
        setFormDetails({
          form: "ReviewLoanApplication",
          stepperPer: 100,
          isStepper: false,
          handleBack,
        });
        break;

      default:
        break;
    }
  };
  const handleExit = (val: boolean) => {
    setExit(val);
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidebar />

        <div className="layout-page">
          <NavbarBanner />
          <form onSubmit={SubmitHandler}>
            <MicroFormWrapper
              step={formDetails.stepperPer}
              isStepper={formDetails.isStepper}
              handleBack={() => formDetails.handleBack()}
              formDetails={formDetails}
              setFormDetails={setFormDetails}
            >
              <>{React.createElement((AllForm as any)[formDetails.form])}</>
            </MicroFormWrapper>
          </form>
        </div>
      </div>

      <div className="layout-overlay layout-menu-toggle"></div>

      <div className="drag-target"></div>
      {exit && <ExitModal handleModel={handleExit} />}
    </div>
  );
}
import { getStaticProps } from "../../pages/index";
export { getStaticProps };
