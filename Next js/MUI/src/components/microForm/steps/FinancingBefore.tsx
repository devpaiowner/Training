import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import { useTranslation } from "react-i18next";
import HtmlParse from "html-react-parser";
import RadioSelectionForm from "@/components/form/radioSelectionForm";
import SelectForm from "@/components/form/selectForm";
import { getStaticProps } from "@/pages";
export { getStaticProps };

interface Iprops {}
export default function FinancingBefore(props?: Iprops) {
  const router = useRouter();
  const refList = useContext(appContext).refList;
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  useEffect(() => {
    if (!storeData?.other_finance_form_desc) {
      setDataError({ other_finance_form_desc: "" });
      // setNewError({ alternate_income_source_desc: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeData?.has_other_finance_form]);

  const { t } = useTranslation("loanForm");
  const errorMessage = useTranslation("errorMessage").t;
  return (
    <>
      <h4 className="mt-2 mb-5 text-center text-dblue">
        {t("have_you_taken_has_other_finance_form")}
      </h4>
      <form className="row">
        <div className="col-6 mb-5">
          <div className="d-flex">
            <div className="form-check me-5">
              <RadioSelectionForm
                name="has_other_finance_form"
                value="yes"
                class="form-check-input"
                handleChange={() => {}}
              />
              <label
                className="form-check-label text-black"
                htmlFor="flexRadioDefault1"
              >
                {t("yes")}
              </label>
            </div>
            <div className="form-check">
              <RadioSelectionForm
                name="has_other_finance_form"
                class="form-check-input"
                value="no"
                handleChange={() =>
                  setStoreData({ other_finance_form_desc: "" })
                }
              />
              <label
                className="form-check-label text-black"
                htmlFor="flexRadioDefault2"
              >
                {t("no")}
              </label>
            </div>
          </div>
          {storeData?.validation?.["has_other_finance_form"] && (
            <div className="error position-relative">
              {errorMessage(storeData?.validation?.["has_other_finance_form"])}
            </div>
          )}

          <h5 className="mt-4 text-black">{t("choose_type_of_financing")}</h5>
          <SelectForm
            name="other_finance_form_desc"
            noneText="Select Option"
            options={[
              { value: "vikoba", text: t("vikoba") },
              { value: "Bank", text: t("bank") },
              {
                value: "friends_family",
                text: t("friends_family"),
              },
              {
                value: "mobile_network_operators",
                text: t("mobile_network_operators"),
              },
              {
                value: "microfinance_institutions",
                text: t("microfinance_institutions"),
              },
              {
                value: "outside_of_country",
                text: t("outside_of_country"),
              },
            ]}
            readOnly={
              storeData?.has_other_finance_form === "yes" ? false : true
            }
          />
        </div>
        <div className="col-md-6">
          <h5 className="text-black">{t("other_forms_financing")}</h5>
          <ul className="chk-list">
            {HtmlParse(t("other_forms_financing_list"))}
          </ul>
        </div>
      </form>
    </>
  );
}
