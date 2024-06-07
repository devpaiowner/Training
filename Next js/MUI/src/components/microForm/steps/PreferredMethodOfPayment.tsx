import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import appContext from "@/common/context/appContext";
import useStore, { IStore } from "@/common/zustand/store";
import BankTransfer from "@/components/FormIcon/bankTransfer";
import MobileTransfer from "@/components/FormIcon/mobileTransfer";
import RadioSelectionForm from "@/components/form/radioSelectionForm";
import MobileTransSupplierLayout from "../mobileTransSupplier";
import BankTransSupplierLayout from "../bankTranSupplier";
import { getStaticProps } from "@/pages";
export { getStaticProps };

interface Iprops {}
export default function PreferredMethodOfPayment(props?: Iprops) {
  const refList = useContext(appContext).refList;
  const { t } = useTranslation("loanForm");
  const errorMessage = useTranslation("errorMessage").t;
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setData,
    })
  );
  return (
    <>
      <h4 className="mt-2 mb-4 text-center text-dblue">
        {t("supplier_method_payment")}
      </h4>
      <div className="d-flex flex-wrap justify-content-center choose-credit">
        <div className="credit">
          <RadioSelectionForm
            value="mobile_transfer"
            name="supplier_payment_method"
            class="form-check-input"
            handleChange={() => {
              setStoreData({
                supplier_payment_method: "mobile_transfer",
              });
              setDataError({
                supplier_business_name: "",
                supplier_mobile: "",
              });
            }}
          />
          <MobileTransfer />
        </div>
        <div className="credit">
          <RadioSelectionForm
            value="bank_transfer"
            name="supplier_payment_method"
            class="form-check-input"
            handleChange={() => {
              setStoreData({
                supplier_payment_method: "bank_transfer",
              });
              setDataError({
                supplier_business_name: "",
                supplier_mobile: "",
                supplier_bank_name: "",
                supplier_bank_branch_code: "",
              });
            }}
          />
          <BankTransfer />
        </div>
      </div>
      {storeData?.validation?.["supplier_payment_method"] && (
        <div className="error position-relative text-center">
          {errorMessage(storeData?.validation?.["supplier_payment_method"])}
        </div>
      )}
      {storeData?.supplier_payment_method === "mobile_transfer" && (
        <div className="mt-5 wd-40 mx-auto">
          <h5 className="text-black">{t("enter_details_below")}</h5>
          <MobileTransSupplierLayout />
        </div>
      )}

      {storeData?.supplier_payment_method === "bank_transfer" && (
        <div className="mt-5 wd-40 mx-auto">
          <h5 className="text-black">{t("enter_details_below")}</h5>
          <BankTransSupplierLayout />
        </div>
      )}
    </>
  );
}
