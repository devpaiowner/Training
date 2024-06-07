import React from "react";

import InputAmountForm from "@/components/form/inputAmountForm";
import useStore, { IStore } from "@/common/zustand/store";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { getStaticProps } from "@/pages";
export { getStaticProps };

export default function ExactAmountNeeded() {
  const router = useRouter();
  const { t } = useTranslation("loanForm");
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
      <h4 className="mt-2 mb-4 text-center text-dblue">
        {t("what_the_exact_amount")}
      </h4>
      <div className="text-center wd-40 mx-auto">
        {router?.pathname === "/revolving-form" ? (
          <InputAmountForm
            name="principal"
            id="floating-label1"
            placeHolder={t("enter_amount")}
            label={t("enter_amount")}
            onChange={() => {
              setDataError({ principal: "" });
            }}
          />
        ) : (
          <InputAmountForm
            name="principal"
            id="floating-label1"
            placeHolder={t("enter_amount")}
            label={t("enter_amount")}
            onChange={() => {
              setDataError({ principal: "" });
            }}
          />
        )}

        <p>
          <span className="icon-timer me-2">
            <span className="path1"></span>
            <span className="path2"></span>
          </span>
          {t("we_will_make_best_offer")}
        </p>
      </div>
    </>
  );
}
