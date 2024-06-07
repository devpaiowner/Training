import React, { useContext, useEffect, useState } from "react";

import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import BankTransfer from "@/components/FormIcon/bankTransfer";
import MobileTransfer from "@/components/FormIcon/mobileTransfer";
import RadioSelectionForm from "@/components/form/radioSelectionForm";
import BankTransLayout from "@/components/microForm/bankTransLayout";
import MobileTransLayout from "@/components/microForm/mobileTransLayout";
import { useTranslation } from "react-i18next";
import { getStaticProps } from "@/pages";
export { getStaticProps };
interface Iprops {}
export default function MethodOfRepayment(props?: Iprops) {
  const refList = useContext(appContext).refList;
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  const { t } = useTranslation("loanForm");
  const errorMessage = useTranslation("errorMessage").t;

  return (
    <>
      <h4 className="mt-2 mb-4 text-center text-dblue">
        {t("would_you_like_repayment")}
        {/* What method of repayment would you like to use? */}
      </h4>
      <div className="w-50 mx-auto">
        <div className="d-flex flex-wrap justify-content-center choose-credit crdit-2">
          <div className="credit">
            <RadioSelectionForm
              value="mobile_transfer"
              name="repayment_method"
              handleChange={() => {
                // setStoreData({
                //     account_name: "",
                //     account_number: "",
                // });
                setDataError({
                  repayment_method: "",
                  //   bank_name: "",
                  //   bank_branch_code: "",
                  //   account_name: "",
                  //   account_number: "",
                });
              }}
            />
            <MobileTransfer />
          </div>
          <div className="credit">
            <RadioSelectionForm
              value="bank_transfer"
              name="repayment_method"
              handleChange={() => {
                // setStoreData({
                //     bank_name: "",
                //     bank_branch_code: "",
                //     account_name: "",
                //     account_number: "",
                // });
                setDataError({
                  repayment_method: "",
                  //   bank_name: "",
                  //   bank_branch_code: "",
                  //   account_name: "",
                  //   account_number: "",
                });
              }}
            />
            <BankTransfer />
          </div>
        </div>
        {storeData?.validation?.["repayment_method"] && (
          <div className="error position-relative text-center">
            {errorMessage(storeData?.validation?.["repayment_method"])}
          </div>
        )}

        {storeData?.repayment_method === "mobile_transfer" && (
          <div className="mt-5 mx-2">
            <h5 className="text-black">{t("enter_details_below")}</h5>
            <MobileTransLayout />
          </div>
        )}
        {storeData?.repayment_method === "bank_transfer" && (
          <div className="mt-5 mx-2">
            <h5 className="text-black">{t("enter_details_below")}</h5>
            <BankTransLayout />
          </div>
        )}
      </div>
    </>
  );
}
