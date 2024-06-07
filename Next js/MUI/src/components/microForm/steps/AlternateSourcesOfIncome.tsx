import React, { useContext, useEffect, useState } from "react";
import appContext from "@/common/context/appContext";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import HtmlParse from "html-react-parser";
import RadioSelectionForm from "@/components/form/radioSelectionForm";
import TextAreaForm from "@/components/form/textAreaForm";
import { useTranslation } from "react-i18next";
import { getStaticProps } from "@/pages";
export { getStaticProps };

interface Iprops {}
export default function AlternateSourcesOfIncome(props?: Iprops) {
  const { t } = useTranslation("loanForm");
  const errorMessage = useTranslation("errorMessage").t;
  const refList = useContext(appContext).refList;
  const { storeData, setStoreData, setDataError, setNewError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
      setNewError: state.setNewError,
    })
  );

  useEffect(() => {
    if (!storeData?.alternate_income_source_desc) {
      setDataError({ alternate_income_source_desc: "" });
      setNewError({ alternate_income_source_desc: "" });
    }
  }, [storeData?.has_alternate_income_source]);

  return (
    <>
      <h4 className="mt-2 mb-5 text-center text-dblue">
        {t("alternate_sources_of_income")}
      </h4>
      <form className="row">
        <div className="col-12 mb-5">
          <div className="d-flex">
            <div className="form-check me-5">
              <RadioSelectionForm
                name="has_alternate_income_source"
                class="form-check-input"
                value="yes"
                handleChange={() =>
                  setDataError({ alternate_income_source_desc: "" })
                }
              />

              <label className="form-check-label" htmlFor="flexRadioDefault1">
                {t("yes")}
              </label>
            </div>
            <div className="form-check">
              <RadioSelectionForm
                name="has_alternate_income_source"
                class="form-check-input"
                value="no"
                handleChange={() =>
                  setDataError({ alternate_income_source_desc: "" })
                }
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                {t("no")}
              </label>
            </div>
          </div>
          {storeData?.validation?.["has_alternate_income_source"] && (
            <div className="error position-relative">
              {errorMessage(
                storeData?.validation?.["has_alternate_income_source"]
              )}
            </div>
          )}
        </div>
        <div className="col-md-6 mb-3">
          <h5 className="text-black">{t("label_alternate_income_source")}</h5>
          <div className="form-label-group">
            <TextAreaForm
              name="alternate_income_source_desc"
              id="floating-label1"
              row={5}
              placeHolder={t("describe_income_source")}
              readOnly={
                storeData?.has_alternate_income_source === "yes" ? false : true
              }
            />

            <label htmlFor="floating-label1">
              {t("describe_income_source")}
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <h5 className="text-black">{t("other_sources_of_income")}</h5>
          <ul className="chk-list">
            {HtmlParse(t("alternate_income_source_desc_list"))}
          </ul>
        </div>
      </form>
    </>
  );
}
