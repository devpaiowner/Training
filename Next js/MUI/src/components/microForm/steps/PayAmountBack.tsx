import React, { useState } from "react";

import useStore, { IStore } from "@/common/zustand/store";
import RadioSelectionForm from "@/components/form/radioSelectionForm";
import RepaymentTerms from "@/components/microForm/repaymentTerms";
import { useTranslation } from "react-i18next";
import { getStaticProps } from "@/pages";
export { getStaticProps };
interface Iprops {}
export default function PayAmountBack(props?: Iprops) {
  const days = ["7", "15", "30", "60", "90"];
  const { t } = useTranslation("loanForm");
  const errorMessage = useTranslation("errorMessage").t;
  const { storeData, setStoreData, setDataError, setNewError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
      setNewError: state.setNewError,
    })
  );

  return (
    <>
      <h4 className="mt-2 mb-4 text-center text-dblue">{}</h4>
      <div className="d-flex flex-wrap justify-content-center choose-credit crdit-4">
        {days.map((day) => (
          <div className="credit crd-sm" key={day}>
            <RadioSelectionForm
              name="tenure"
              value={day.toString()}
              handleChange={() => {
                setStoreData({ tenure: day });
                setDataError({ tenure: "" });
              }}
            />
            <p className="mb-0">
              {day} {t("days")}
            </p>
          </div>
        ))}
      </div>
      {storeData?.validation?.["tenure"] && (
        <div className="error position-static text-center">
          {errorMessage(storeData?.validation?.["tenure"])}
        </div>
      )}
      <RepaymentTerms />
    </>
  );
}
