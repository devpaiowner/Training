import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HtmlParse from "html-react-parser";

import useStore, { IStore } from "@/common/zustand/store";
import EmergencyExp from "@/components/FormIcon/emergencyExp";
import InventoryStock from "@/components/FormIcon/inventoryStock";
import OfficeRent from "@/components/FormIcon/officeRent";
import PayrollAdvance from "@/components/FormIcon/payrollAdvance";
import InventoryStockOneBrand from "@/components/FormIcon/inventoryStockOneBrand";
import InventoryStockMultiBrand from "@/components/FormIcon/inventoryStockMultiBrand";
import InputForm from "@/components/form/inputForm";
import RadioSelectionForm from "@/components/form/radioSelectionForm";
import { useTranslation } from "react-i18next";
import { getStaticProps } from "@/pages";
export { getStaticProps };

interface Iprops {}

export default function PurposeFinancing(props?: Iprops) {
  const { storeData, setStoreData, setDataError, setNewError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
      setNewError: state.setNewError,
    })
  );
  const router = useRouter();
  const { t } = useTranslation("loanForm");
  const errorMessage = useTranslation("errorMessage").t;
  return (
    <>
      <h4 className="mt-2 mb-4 text-center text-dblue">
        {t("purpose_for_this_financing")}
      </h4>

      {router.pathname === "/revolving-form" ? (
        <>
          <div className="d-flex flex-wrap justify-content-center choose-credit">
            <div className="credit w-25">
              <RadioSelectionForm
                value={t("inventory_stock_for_one_brand")}
                name="purpose"
                handleChange={() => {
                  setDataError({
                    purpose: "",
                  });
                }}
              />
              <InventoryStockOneBrand />
            </div>
            <div className="credit w-25">
              <RadioSelectionForm
                value={t("inventory_stock_for_multiple_brand")}
                name="purpose"
                handleChange={() => {
                  setDataError({
                    purpose: "",
                  });
                }}
              />
              <InventoryStockMultiBrand />
            </div>
          </div>
          {storeData?.validation?.["purpose"] && (
            <div className="error position-relative text-center">
              {errorMessage(storeData?.validation?.["purpose"])}
            </div>
          )}

          <div className="text-center w-75 mx-auto text-black mt-5">
            <p>{HtmlParse(t("one_supplier_or_one_company"))} </p>

            <p>{HtmlParse(t("indicate_a_purchase_order"))}</p>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex flex-wrap justify-content-center choose-credit crdit-4">
            <div className="credit">
              <RadioSelectionForm
                value={t("inventory")}
                name="purpose"
                handleChange={() => {
                  setStoreData({ purpose_other: "" });
                  setDataError({
                    purpose: "",
                    purpose_other: "",
                  });
                }}
              />
              <InventoryStock />
            </div>
            <div className="credit">
              <RadioSelectionForm
                value={t("office_space")}
                name="purpose"
                handleChange={() => {
                  setStoreData({ purpose_other: "" });
                  setDataError({
                    purpose: "",
                    purpose_other: "",
                  });
                }}
              />
              <OfficeRent />
            </div>
            <div className="credit">
              <RadioSelectionForm
                value={t("payroll_ad")}
                name="purpose"
                handleChange={() => {
                  setStoreData({ purpose_other: "" });
                  setDataError({
                    purpose: "",
                    purpose_other: "",
                  });
                }}
              />
              <PayrollAdvance />
            </div>
            <div className="credit">
              <RadioSelectionForm
                value={t("emergency_expens")}
                name="purpose"
                handleChange={() => {
                  setStoreData({ purpose_other: "" });
                  setDataError({
                    purpose: "",
                    purpose_other: "",
                  });
                }}
              />
              <EmergencyExp />
            </div>{" "}
          </div>
          <div className="text-center wd-40 mx-auto">
            <form className="mt-5 d-flex align-items-center">
              <div className="form-label-group">
                <InputForm
                  name="purpose_other"
                  id="floating-label1"
                  placeHolder={t("other")}
                  onChange={() => {
                    setStoreData({
                      purpose: undefined,
                    }),
                      setDataError({
                        purpose: "",
                        purpose_other: "",
                      });
                  }}
                />
                <label htmlFor="floating-label1">{t("other")}</label>
              </div>
              {storeData?.validation?.["purpose_other"] ? (
                <button
                  type="button"
                  style={{ marginTop: "-25px" }}
                  className="ms-2 icon-question fs-5"
                  data-toggle="tooltip"
                  data-placement="top"
                  title={t("purp_tooltip")}
                ></button>
              ) : (
                <button
                  type="button"
                  className="ms-2 icon-question fs-5"
                  data-toggle="tooltip"
                  data-placement="top"
                  title={t("purp_tooltip")}
                ></button>
              )}
            </form>
          </div>
        </>
      )}
    </>
  );
}
