import React, { useContext, useState } from "react";
import Sidebar from "@/components/SidebarLayout";
import NavbarBanner from "@/components/layout/NavbarBanner";
import { useRouter } from "next/router";

import useStore, { IStore } from "@/common/zustand/store";
import MicroFormWrapper from "@/components/microForm/microFormWrapper";
import validation from "@/common/utils/validation";
import appContext, { AppContext } from "@/common/context/appContext";
import AllForm from "@/components/microForm/steps";
import { getStaticProps } from "../../pages/index";
export { getStaticProps };

export default function Micro() {
  const router = useRouter();
  const [formDetails, setFormDetails] = useState({
    form: "ExactAmountNeeded",
    // form: "SelectedPayrollAdvance",
    stepperPer: 10,
    isStepper: true,
    handleBack: () => handleBack(true),
  });
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
        validationField.push("purpose_other");
        if (
          validation(
            {
              ...storeData,
              purpose_other: storeData.purpose ?? storeData.purpose_other,
            },
            validationField,
            setDataError,
            refList
          )
        ) {
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
        } else validationField.push("account_name", "mobile");

        if (validation(storeData, validationField, setNewError, refList)) {
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
        } else if (storeData?.has_existing_loan === "yes") {
          validationField.push("existing_loan_type", "existing_loan_amount");
        }
        if (validation(storeData, validationField, setDataError, refList)) {
          break;
        }
        setFormDetails({
          form: "SelectedPayrollAdvance",
          stepperPer: 100,
          isStepper: true,
          handleBack,
        });
        break;
      case "SelectedPayrollAdvance":
        if (storeData.purpose === "Inventory") {
          validationField.push(
            "inventoryLpo",
            "payrollDoc1",
            "payrollDoc2",
            "payrollDoc3"
          );
        } else if (storeData.purpose === "Office space") {
          validationField.push("payrollDoc1");
        } else if (storeData.purpose === "Payroll advance") {
          validationField.push("payrollDoc1", "payrollDoc2", "payrollDoc3");
        } else if (storeData.purpose === "Emergency expenses") {
          validationField.push("payrollDoc1");
        } else {
          validationField.push("payrollDoc1");
        }
        if (validation(storeData, validationField, setDataError, refList)) {
          break;
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
    </div>
  );
}
