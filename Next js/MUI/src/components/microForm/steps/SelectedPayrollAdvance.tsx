import InputFile from "@/components/form/inputFile";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import appContext from "@/common/context/appContext";
import useStore, { IStore } from "@/common/zustand/store";
import { LOAN_DOCS } from "@/common/utils/constant";
import RadioSelectionForm from "@/components/form/radioSelectionForm";
import { getStaticProps } from "@/pages";
export { getStaticProps };

interface Iprops {}

export default function SelectedPayrollAdvance(props?: Iprops) {
  const [agentCall, serAgentCall] = useState(false);
  const [docName, setDocName] = useState("Document");
  const { t } = useTranslation("loanForm");
  const refList = useContext(appContext).refList;
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setData,
    })
  );

  useEffect(() => {
    switch (storeData?.purpose) {
      case "Payroll advance": {
        setDocName("Pay Slips/Bank Statement");
        break;
      }
      case "Emergency expenses": {
        setDocName("Emergency need");
        break;
      }
      case "Office space": {
        setDocName("Pay Rental Invoice/Bill Statement");
        break;
      }
      case "Inventory": {
        setDocName("Pay Invoice");
        break;
      }
      default: {
        setDocName("Other Document");
      }
    }
  }, []);

  let payrollDocs = [
    {
      type: { LOAN_DOCS },
      name: "payrollDoc1",
      store: "payrollDoc1",
      title: `${docName} 1`,
    },
    {
      type: { LOAN_DOCS },
      name: "payrollDoc2",
      store: "payrollDoc2",
      title: `${docName} 2`,
    },
    {
      type: { LOAN_DOCS },
      name: "payrollDoc3",
      store: "payrollDoc3",
      title: `${docName} 3`,
    },
  ];
  return (
    <>
      <h4 className="mt-2 mb-5 text-center text-dblue">
        {t("because_you_selected")}{" "}
        {storeData?.purpose === "Payroll advance" && <em>{t("payroll_ad")}</em>}
        {storeData?.purpose === "Emergency expenses" && (
          <em>{t("emergency_expens")}</em>
        )}
        {storeData?.purpose === "Office space" && (
          <em>{t("office_space_rent")}</em>
        )}
        {storeData?.purpose === "Inventory" && <em>{t("inventory_stock")}</em>}
        {storeData?.purpose_other && <em>{t("other")}</em>}
      </h4>
      <div className="mt-5 wd-60 mx-auto">
        <form className="mt-2">
          {storeData?.purpose === "Inventory" && (
            <>
              <div>
                <h5 className="text-dblue">
                  <small>{t("purchase_order_that_needs")}</small>
                </h5>
                <div className="border-1" style={{ marginBottom: "20px" }}>
                  <InputFile
                    type={LOAN_DOCS}
                    name={"inventoryLpo"}
                    store={"inventoryLpoStore"}
                    title={t("upload_lpo")}
                  />
                </div>
              </div>
            </>
          )}

          <h5 className="text-dblue">
            {storeData?.purpose === "Payroll advance" && (
              <small>
                <em>{t("upload_last_pay_slip")}</em>
              </small>
            )}
            {storeData?.purpose === "Emergency expenses" && (
              <small>
                <em>{t("upload_emergency_need")}</em>
              </small>
            )}
            {storeData?.purpose === "Office space" && (
              <small>
                <em>{t("upload_rental_invoice")}</em>
              </small>
            )}
            {storeData?.purpose === "Inventory" && (
              <small>
                <em>{t("last_invoice_po")}</em>
              </small>
            )}
            {storeData?.purpose_other && (
              <small>
                <em>{t("indicating_finacing_need")}</em>
              </small>
            )}
          </h5>

          <div className="border-1">
            {payrollDocs?.length > 0 &&
              payrollDocs?.map((item, index) => {
                return (
                  <InputFile
                    key={index}
                    type={item?.type?.LOAN_DOCS}
                    name={item?.name}
                    store={item?.store}
                    title={item?.title}
                  />
                );
              })}
          </div>
          {storeData?.purpose === "Payroll advance" && (
            <div className="form-check mt-3 ms-2">
              <RadioSelectionForm
                name="switch_agent_call"
                value="no"
                class="form-check-input mt-2"
                handleChange={() => setStoreData({ switch_agent_call: true })}
              />
              <label
                className="form-check-label text-dblue"
                htmlFor="flexRadioDefault1"
              >
                {t("prefer_not_sharing_documents")}
              </label>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
