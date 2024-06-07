import React, { useContext, useEffect, useState } from "react";
import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import { useTranslation } from "react-i18next";

import InputAmountForm from "@/components/form/inputAmountForm";
import RadioSelectionForm from "@/components/form/radioSelectionForm";
import SelectForm from "@/components/form/selectForm";
import InputForm from "@/components/form/inputForm";
import { getStaticProps } from "@/pages";
export { getStaticProps };

interface Iprops {}
export default function PayBackOverTheNext3Months(props?: Iprops) {
  const refList = useContext(appContext).refList;
  const { storeData, setStoreData, setDataError, setNewError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
      setNewError: state.setNewError,
    })
  );
  const { t } = useTranslation("loanForm");
  const errorMessage = useTranslation("errorMessage").t;
  return (
    <>
      <h4 className="mt-2 mb-5 text-center text-dblue">
        {t("have_you_currently_taken_loan")}
      </h4>
      <form className="wd-40 mx-auto">
        <div className="d-flex justify-content-center">
          <div className="form-check me-5">
            <RadioSelectionForm
              name="has_existing_loan"
              value="yes"
              class="form-check-input"
              handleChange={() => setStoreData({})}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              {t("yes")}
            </label>
          </div>
          <div className="form-check">
            <RadioSelectionForm
              name="has_existing_loan"
              class="form-check-input"
              value="no"
              handleChange={() => setStoreData({})}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              {t("no")}
            </label>
          </div>
        </div>
        {storeData?.validation?.["has_existing_loan"] && (
          <div className="error position-relative text-center">
            {errorMessage(storeData?.validation?.["has_existing_loan"])}
          </div>
        )}
        {storeData?.has_existing_loan === "yes" && (
          <>
            <h5 className="mt-5 text-black">{t("enter_details_below")}</h5>

            <div className="form-label-group mb-3">
              <InputForm
                name="existing_loan_type"
                id="floating-label1"
                placeHolder={t("enter_loan_type")}
                onChange={() => {
                  // setNewError({ existing_loan_amount: "" });
                  // setDataError({ existing_loan_amount: "" });
                }}
                readOnly={storeData?.has_existing_loan === "yes" ? false : true}
                disable={storeData?.has_existing_loan === "yes" ? false : true}
              />
              <label htmlFor="floating-label1">{t("enter_loan_type")}</label>
            </div>

            <InputAmountForm
              name="existing_loan_amount"
              id="floating-label2"
              placeHolder={t("enter_amount")}
              label={t("enter_amount")}
              onChange={() => {
                setDataError({ existing_loan_amount: "" });
                // setNewError({ existing_loan_type: "" });
              }}
              readOnly={storeData?.has_existing_loan === "yes" ? false : true}
              disable={storeData?.has_existing_loan === "yes" ? false : true}
            />
          </>
        )}
      </form>
    </>
  );
}
