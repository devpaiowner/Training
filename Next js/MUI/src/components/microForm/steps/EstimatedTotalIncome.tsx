import InputAmountForm from "@/components/form/inputAmountForm";
import React from "react";
import useStore, { IStore } from "@/common/zustand/store";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { getStaticProps } from "@/pages";
export { getStaticProps };

interface Iprops {}
export default function EstimatedTotalIncome(props?: Iprops) {
  const { t } = useTranslation("loanForm");
  const { storeData, setStoreData, setDataError, setNewError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
      setNewError: state.setNewError,
    })
  );
  const router = useRouter();
  return (
    <>
      <h4 className="mt-2 mb-1 text-center text-dblue">
        {t("what_is_your")}{" "}
        {router.pathname !== "/revolving-form" && t("estimated")}{" "}
        {t("total_total_monthly_income")}{" "}
      </h4>
      <p className=" mb-4 text-center text-dblue">
        {t("how_much_profit_per_month")}
      </p>
      <div className="text-center wd-40 mx-auto">
        <InputAmountForm
          name="total_monthly_income"
          id="floating-label1"
          placeHolder="Enter Amount"
          label="Enter Amount"
          onChange={() => {
            setDataError({ total_monthly_income: "" });
          }}
        />
      </div>
    </>
  );
}
